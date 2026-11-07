
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'http://192.168.1.3:5000';
const POLLING_INTERVAL = 3000;

type Tab = 'home' | 'alert' | 'loc' | 'rep' | 'pro';

type SensorData = {
  camera: string;
  microphone: string;
  wearable: string;
};
type SensorTestResult = {
  status: string;
  test_passed: boolean;
  mode: string;
};

type SensorTestResponse = {
  message: string;
  mode: string;
  results: Record<string, SensorTestResult>;
};

type ApiData = {
  patient: string;
  age: number;
  safety_status: string;
  fall_detected: boolean;
  sensors: SensorData;
  updated_at: string;
};

type HistoryEvent = {
  id: number;
  event_type: string;
  description: string;
  patient: string;
  timestamp: string;
};

type HistoryResponse = {
  count: number;
  history: HistoryEvent[];
};

export default function HomeScreen() {
  const [tab, setTab] = useState<Tab>('home');

  const [apiStatus, setApiStatus] = useState<ApiData | null>(null);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  // State untuk pengelolaan sensor
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [sensorLoading, setSensorLoading] = useState(false);
  const [sensorError, setSensorError] = useState('');

  const [sensorTestLoading, setSensorTestLoading] = useState(false);
  const [sensorTestError, setSensorTestError] = useState('');
  const [sensorTestResults, setSensorTestResults] =
    useState<Record<string, SensorTestResult> | null>(null);

  const [acknowledged, setAcknowledged] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const previousFallStatus = useRef<boolean | null>(null);

  // Mengambil status pasien dari backend.
  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/status`);

      if (!response.ok) {
        throw new Error('Gagal mengambil status pasien.');
      }

      const data: ApiData = await response.json();

      setApiStatus(data);
      setApiError('');
    } catch {
      setApiError('Backend tidak dapat dihubungi. Periksa koneksi Wi-Fi dan Flask.');
    } finally {
      setLoading(false);
    }
  };

  // Mengambil riwayat kejadian dari backend.
  const fetchHistory = async () => {
    setHistoryLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/history`);

      if (!response.ok) {
        throw new Error('Gagal mengambil riwayat.');
      }

      const data: HistoryResponse = await response.json();

      setHistory(data.history);
    } catch (error) {
      console.log('History error:', error);
    } finally {
      setHistoryLoading(false);
    }
  };
// Mengambil status sensor dari Flask.
  const fetchSensors = async () => {
    setSensorLoading(true);
    setSensorError('');

    try {
      const response = await fetch(`${API_URL}/api/sensors`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal mengambil status sensor.');
      }

      setSensorData(data.sensors);
    } catch (error) {
      setSensorError(
        error instanceof Error
          ? error.message
          : 'Gagal mengambil status sensor.'
      );
    } finally {
      setSensorLoading(false);
    }
  };
  // Mengubah status sensor melalui Flask.
  const updateSensor = async (
    sensor: keyof SensorData,
    status: string
  ) => {
    setSensorLoading(true);
    setSensorError('');

    try {
      const response = await fetch(`${API_URL}/api/sensors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sensor, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal memperbarui sensor.');
      }

      await fetchSensors();
      await fetchStatus();
      await fetchHistory();
    } catch (error) {
      setSensorError(
        error instanceof Error
          ? error.message
          : 'Gagal memperbarui status sensor.'
      );
    } finally {
      setSensorLoading(false);
    }
  };

  // Menguji sensor melalui Flask.
  const testSensors = async () => {
    setSensorTestLoading(true);
    setSensorTestError('');

    try {
      const response = await fetch(`${API_URL}/api/sensors/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data: SensorTestResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Pengujian sensor gagal.');
      }

      setSensorTestResults(data.results);
    } catch (error) {
      setSensorTestError(
        error instanceof Error
          ? error.message
          : 'Gagal menguji sensor.'
      );
    } finally {
      setSensorTestLoading(false);
    }
  };
  // Memperbarui status jatuh pada backend.
    const simulateFall = async (detected: boolean): Promise<boolean> => {
      if (sending) return false;

      setSending(true);
      setApiError('');

      try {
        const response = await fetch(`${API_URL}/api/fall`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fall_detected: detected,
          }),
        });

        if (!response.ok) {
          throw new Error('Gagal memperbarui status jatuh.');
        }

        await Promise.all([fetchStatus(), fetchHistory()]);

        return true;
      } catch {
        setApiError('Gagal mengirim perubahan ke backend.');
        return false;
      } finally {
        setSending(false);
      }
    };

  // Konfirmasi caregiver.
  const confirmFall = () => {
    setAcknowledged(true);
    setActionMessage('Jatuh dikonfirmasi. Tindak lanjut dicatat pada aplikasi.');
  };
  // Menyelesaikan penanganan kejadian jatuh.
const finishHandling = () => {
  Alert.alert(
    'Selesaikan Penanganan',
    'Apakah penanganan kejadian jatuh sudah selesai?',
    [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya, Selesaikan',
        onPress: async () => {
          const success = await simulateFall(false);

          if (success) {
            setAcknowledged(false);
            setActionMessage(
              'Penanganan kejadian jatuh telah diselesaikan.'
            );
            setTab('home');
          }
        },
      },
    ]
  );
};

  // Menandai alarm palsu dan mereset simulasi.
  // Menandai alarm palsu dan mereset simulasi.
const markFalseAlarm = () => {
  Alert.alert(
    'Konfirmasi Alarm Palsu',
    'Apakah kamu yakin ingin menandai kejadian ini sebagai alarm palsu?',
    [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya, Alarm Palsu',
        onPress: async () => {
          const success = await simulateFall(false);

          if (success) {
            setAcknowledged(false);
            setActionMessage('Kejadian ditandai sebagai alarm palsu.');
            setTab('home');
          }
        },
      },
    ]
  );
};
  // Pembaruan otomatis setiap 3 detik.
  useEffect(() => {
    fetchStatus();
    fetchHistory();
    fetchSensors();

    const intervalId = setInterval(() => {
      fetchStatus();
      fetchHistory();
      fetchSensors();
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  // Dialog ketika backend mendeteksi jatuh.
  useEffect(() => {
    const currentFall = apiStatus?.fall_detected;

    if (currentFall === undefined) return;

    const previous = previousFallStatus.current;

    if (currentFall && previous !== true) {
      setAcknowledged(false);
      setActionMessage('');
      setTab('alert');

      Alert.alert(
        'Peringatan Jatuh',
        `Kejadian jatuh terdeteksi pada pasien ${apiStatus.patient}. Periksa kondisi pasien.`,
        [{ text: 'Mengerti' }]
      );
    }

    if (!currentFall && previous === true) {
      setAcknowledged(false);
    }

    previousFallStatus.current = currentFall;
  }, [apiStatus?.fall_detected, apiStatus?.patient]);

  const isFall = apiStatus?.fall_detected === true;

  const patientName = apiStatus?.patient ?? 'Siti Aminah';
  const patientAge = apiStatus?.age ?? 72;

  const activeSensors = apiStatus
    ? Object.values(apiStatus.sensors).filter(
        (sensor) => sensor === 'simulated' || sensor === 'connected'
      ).length
    : 0;

  const todayIncidents = history.filter((event) => {
    return (
      event.event_type === 'fall_detected' &&
      new Date(event.timestamp).toDateString() === new Date().toDateString()
    );
  }).length;

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return 'Waktu tidak tersedia';
    }

    return (
      date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) +
      ' • ' +
      date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };

  const sensorStatus = (status?: string) => {
    if (status === 'simulated') return 'Aktif';
    if (status === 'connected') return 'Terhubung';
    if (status === 'disconnected') return 'Terputus';
    return 'Tidak diketahui';
  };

  const latestFall = history.find(
    (event) => event.event_type === 'fall_detected'
  );

  // Navigasi bawah.
  const navigation: { id: Tab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'loc', label: 'Lokasi', icon: '⌖' },
    { id: 'rep', label: 'Laporan', icon: '▥' },
    { id: 'pro', label: 'Profil', icon: '♙' },
  ];

  // Kartu status sensor.
  const SensorRow = ({
    title,
    description,
    status,
  }: {
    title: string;
    description: string;
    status?: string;
  }) => (
    <View style={styles.sensorRow}>
      <View style={styles.flexOne}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.muted}>{description}</Text>
      </View>
      <Text
        style={[
          styles.pill,
          status === 'disconnected' ? styles.pillRed : styles.pillGreen,
        ]}
      >
        {sensorStatus(status)}
      </Text>
    </View>
  );

  // Halaman Home.
  const renderHome = () => (
    <>
      <View style={styles.homeHeader}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>
            Selamat pagi, Caregiver
          </Text>

          <Text style={styles.pageTitle}>
            CareSense AI
          </Text>
        </View>
      </View>

      <View style={[styles.hero, isFall && styles.heroDanger]}>
        <Text style={styles.heroLabel}>Status lansia</Text>
        <Text style={styles.heroStatus}>
          {isFall ? 'Jatuh Terdeteksi' : 'Normal'}
        </Text>
        <Text style={styles.heroLabel}>
          {isFall
            ? 'Perlu pemeriksaan caregiver'
            : 'Contoh tampilan pemantauan pasien'}
        </Text>
      </View>

      {apiError !== '' && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{apiError}</Text>
          <TouchableOpacity onPress={fetchStatus}>
            <Text style={styles.retryText}>Coba lagi</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.statsRow}>
        <View style={[styles.card, styles.statCard]}>
          <Text style={styles.muted}>Sensor</Text>
          <Text style={styles.statValue}>
            {activeSensors}/3 aktif
          </Text>
        </View>

        <View style={[styles.card, styles.statCard]}>
          <Text style={styles.muted}>Insiden hari ini</Text>
          <Text style={styles.statValue}>{todayIncidents}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status Sensor</Text>

        <SensorRow
          title="Visual"
          description="YOLOv8-Pose · Postur tubuh"
          status={apiStatus?.sensors.camera}
        />

        <SensorRow
          title="Audio"
          description="MFCC · Analisis suara"
          status={apiStatus?.sensors.microphone}
        />

        <SensorRow
          title="Wearable"
          description="IMU · Data gerakan"
          status={apiStatus?.sensors.wearable}
        />
              {sensorError !== '' && (
        <Text style={styles.errorText}>{sensorError}</Text>
      )}

      {sensorTestError !== '' && (
        <Text style={styles.errorText}>{sensorTestError}</Text>
      )}

      <View style={{ marginTop: 12, gap: 10 }}>
        <Text style={styles.cardTitle}>Pengelolaan Sensor</Text>

        {(
          [
            { key: 'camera', label: 'Visual' },
            { key: 'microphone', label: 'Audio' },
            { key: 'wearable', label: 'Wearable' },
          ] as const
        ).map((sensor) => {
          const currentStatus =
            sensorData?.[sensor.key] ??
            apiStatus?.sensors[sensor.key];

          return (
            <View key={sensor.key} style={{ gap: 6 }}>
              <Text style={styles.muted}>
                {sensor.label}: {sensorStatus(currentStatus)}
              </Text>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1 }]}
                  disabled={sensorLoading}
                  onPress={() =>
                    updateSensor(sensor.key, 'simulated')
                  }
                >
                  <Text style={styles.buttonTextDark}>Aktifkan</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { flex: 1 }]}
                  disabled={sensorLoading}
                  onPress={() =>
                    updateSensor(sensor.key, 'disconnected')
                  }
                >
                  <Text style={styles.buttonTextDark}>Putuskan</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={testSensors}
          disabled={sensorTestLoading}
        >
          {sensorTestLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Uji Semua Sensor</Text>
          )}
        </TouchableOpacity>

        {sensorTestResults && (
          <View style={{ gap: 8 }}>
            <Text style={styles.cardTitle}>Hasil Pengujian</Text>

            {Object.entries(sensorTestResults).map(([key, result]) => (
              <View key={key} style={styles.infoRow}>
                <Text style={styles.muted}>{key}</Text>
                <Text style={styles.infoValue}>
                  {result.test_passed ? 'Lulus' : 'Tidak lulus'}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Aktivitas Terbaru</Text>

        {history.length === 0 ? (
          <Text style={styles.muted}>
            Belum ada data aktivitas.
          </Text>
        ) : (
          history.slice(0, 2).map((event) => (
            <View key={event.id} style={styles.activityRow}>
              <View style={styles.flexOne}>
                <Text style={styles.cardTitle}>
                  {event.event_type === 'fall_detected'
                    ? 'Peringatan Jatuh'
                    : 'Status Normal'}
                </Text>
                <Text style={styles.muted}>
                  {formatDateTime(event.timestamp)}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, styles.buttonRed]}
        disabled={sending}
        onPress={() => {
          if (isFall) {
            setTab('alert');
          } else {
            simulateFall(true);
          }
        }}
      >
        {sending ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>
            {isFall ? 'Lihat Peringatan Jatuh' : 'Simulasikan Jatuh'}
          </Text>
        )}
      </TouchableOpacity>

      {isFall && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTab('alert')}
        >
          <Text style={styles.buttonTextDark}>Buka Detail Peringatan</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.note}>
        Data sensor dan deteksi jatuh masih berupa simulasi.
      </Text>
    </>
  );

  // Halaman peringatan.
  const renderAlert = () => (
    <>
      <Text style={styles.pageTitle}>Peringatan Jatuh</Text>

      {!isFall ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Tidak ada peringatan jatuh aktif.
          </Text>
          <Text style={styles.muted}>
            Ketika backend mendeteksi simulasi jatuh, detail peringatan akan muncul di sini.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => simulateFall(true)}
            disabled={sending}
          >
            <Text style={styles.buttonText}>Simulasikan Jatuh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={[styles.hero, styles.heroDanger]}>
            <Text style={styles.heroLabel}>PERLU TINDAKAN SEGERA</Text>
            <Text style={styles.alertTitle}>Jatuh Terdeteksi</Text>
            <Text style={styles.heroLabel}>
              {acknowledged
                ? 'Sudah dikonfirmasi caregiver'
                : 'Belum dikonfirmasi caregiver'}
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.muted}>Pasien</Text>
              <Text style={styles.infoValue}>{patientName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.muted}>Usia</Text>
              <Text style={styles.infoValue}>{patientAge} tahun</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.muted}>Waktu kejadian</Text>
              <Text style={styles.infoValue}>
                {latestFall
                  ? formatDateTime(latestFall.timestamp)
                  : 'Data belum tersedia'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.muted}>Keterangan</Text>
              <Text style={styles.infoValue}>
                {latestFall?.description ?? 'Simulasi jatuh terdeteksi'}
              </Text>
            </View>
          </View>

          {actionMessage !== '' && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{actionMessage}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, styles.buttonRed]}
            onPress={() => {
              Alert.alert(
                'Layanan Darurat',
                'Ini adalah tombol demonstrasi. Hubungi layanan darurat secara langsung jika diperlukan.'
              );
            }}
          >
            <Text style={styles.buttonText}>Hubungi Layanan Darurat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert(
                'Hubungi Caregiver',
                'Fitur komunikasi caregiver belum terhubung.'
              );
            }}
          >
            <Text style={styles.buttonTextDark}>Hubungi Caregiver Lain</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={confirmFall}
            disabled={acknowledged}
          >
            <Text style={styles.buttonText}>
              {acknowledged ? 'Jatuh Sudah Dikonfirmasi' : 'Konfirmasi Jatuh'}
            </Text>
          </TouchableOpacity>
          {acknowledged && (
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={finishHandling}
              disabled={sending}
            >
              {sending ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>
                  Selesaikan Penanganan
                </Text>
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={markFalseAlarm}
            disabled={sending}
          >
            <Text style={styles.buttonTextDark}>Alarm Palsu</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );

  // Halaman lokasi.
  const renderLocation = () => (
    <>
      <Text style={styles.pageTitle}>Lokasi</Text>

      <View style={[styles.card, styles.mapPlaceholder]}>
        <Text style={styles.mapIcon}>⌖</Text>
        <Text style={styles.cardTitle}>Peta Lokasi Lansia</Text>
        <Text style={styles.muted}>
          Peta GIS akan ditampilkan di area ini.
        </Text>
        <Text style={styles.muted}>
          Integrasi GPS belum tersedia pada prototipe.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informasi Lokasi</Text>
        <Text style={styles.muted}>
          Lokasi pasien belum terhubung dengan perangkat GPS.
        </Text>
      </View>
    </>
  );

  // Halaman laporan.
  const renderReport = () => (
    <>
      <Text style={styles.pageTitle}>Laporan</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tren Mobilitas</Text>

        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartLine}>╱╲_╱╲_╱</Text>
        </View>

        <Text style={styles.muted}>
          Grafik contoh, belum menggunakan data sensor aktual.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Riwayat Insiden</Text>

        {historyLoading && (
          <ActivityIndicator color="#0F766E" />
        )}

        {history.length === 0 ? (
          <Text style={styles.muted}>
            Belum ada riwayat insiden.
          </Text>
        ) : (
          history.map((event) => {
            const fall = event.event_type === 'fall_detected';

            return (
              <View key={event.id} style={styles.reportRow}>
                <View style={styles.flexOne}>
                  <Text style={styles.cardTitle}>
                    {formatDateTime(event.timestamp)}
                  </Text>
                  <Text style={styles.muted}>
                    {event.description}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.pill,
                    fall ? styles.pillRed : styles.pillGreen,
                  ]}
                >
                  {fall ? 'Jatuh' : 'Normal'}
                </Text>
              </View>
            );
          })
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={fetchHistory}
          disabled={historyLoading}
        >
          <Text style={styles.buttonTextDark}>Perbarui Riwayat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ringkasan AI</Text>
        <Text style={styles.muted}>
          Ringkasan otomatis belum tersedia karena fitur AI belum diintegrasikan.
        </Text>
      </View>
    </>
  );

  // Halaman profil.
  const renderProfile = () => (
    <>
      <Text style={styles.pageTitle}>Profil Lansia</Text>

      <View style={styles.card}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileEmoji}>👵</Text>
        </View>

        <Text style={styles.profileName}>{patientName}</Text>
        <Text style={styles.muted}>Lansia · {patientAge} tahun</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informasi Pasien</Text>

        <View style={styles.infoRow}>
          <Text style={styles.muted}>Nama</Text>
          <Text style={styles.infoValue}>{patientName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.muted}>Usia</Text>
          <Text style={styles.infoValue}>{patientAge} tahun</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.muted}>Kontak darurat</Text>
          <Text style={styles.infoValue}>Belum tersedia</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.muted}>Riwayat kesehatan</Text>
          <Text style={styles.infoValue}>Belum tersedia</Text>
        </View>
      </View>

      <Text style={styles.note}>
        Informasi kontak dan riwayat kesehatan masih berupa placeholder.
      </Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F2F7F7"
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading && !apiStatus ? (
          <ActivityIndicator
            size="large"
            color="#0F766E"
            style={styles.loader}
          />
        ) : (
          <>
            {tab === 'home' && renderHome()}
            {tab === 'alert' && renderAlert()}
            {tab === 'loc' && renderLocation()}
            {tab === 'rep' && renderReport()}
            {tab === 'pro' && renderProfile()}
          </>
        )}
      </ScrollView>

      <View style={styles.navigation}>
        {navigation.map((item) => {
          const active = tab === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => setTab(item.id)}
            >
              <Text
                style={[
                  styles.navIcon,
                  active && styles.navActive,
                ]}
              >
                {item.icon}
              </Text>

              <Text
                style={[
                  styles.navLabel,
                  active && styles.navActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    gap: 3,
  },

  greeting: {
    fontSize: 12,
    color: '#486060',
    lineHeight: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F7F7',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
    gap: 14,
  },
  loader: {
    marginTop: 100,
  },
  flexOne: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F2A2A',
  },
  muted: {
    fontSize: 12,
    color: '#486060',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE8E8',
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F2A2A',
  },
  hero: {
    backgroundColor: '#0F766E',
    borderRadius: 16,
    padding: 18,
  },
  heroDanger: {
    backgroundColor: '#B42318',
  },
  heroLabel: {
    color: '#D7F0EC',
    fontSize: 12,
  },
  heroStatus: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginVertical: 5,
  },
  alertTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    marginVertical: 5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2A2A',
    marginTop: 4,
  },
  sensorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F2',
  },
  pill: {
    fontSize: 10,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },
  pillGreen: {
    color: '#0B5A53',
    backgroundColor: '#D7F0EC',
  },
  pillRed: {
    color: '#9B2018',
    backgroundColor: '#FCE5E2',
  },
  activityRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F2',
  },
  button: {
    minHeight: 46,
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonPrimary: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  buttonRed: {
    backgroundColor: '#B42318',
    borderColor: '#B42318',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  buttonTextDark: {
    color: '#0F5F58',
    fontSize: 13,
    fontWeight: '700',
  },
  note: {
    color: '#718078',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F2',
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '700',
    color: '#0F2A2A',
  },
  mapPlaceholder: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  mapIcon: {
    fontSize: 55,
    color: '#0F766E',
  },
  chartPlaceholder: {
    height: 120,
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DCE8E8',
    justifyContent: 'center',
  },
  chartLine: {
    fontSize: 38,
    color: '#0F766E',
    textAlign: 'center',
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F2',
  },
  profileAvatar: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#D7F0EC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  profileEmoji: {
    fontSize: 38,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    color: '#0F2A2A',
    marginBottom: 4,
  },
  errorCard: {
    backgroundColor: '#FCE5E2',
    padding: 14,
    borderRadius: 12,
  },
  errorText: {
    color: '#B42318',
    fontSize: 12,
  },
  retryText: {
    color: '#B42318',
    fontWeight: '700',
    marginTop: 8,
  },
  navigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DCE8E8',
    paddingTop: 7,
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  navIcon: {
    fontSize: 22,
    color: '#486060',
  },
  navLabel: {
    fontSize: 10,
    color: '#486060',
    marginTop: 2,
  },
  navActive: {
    color: '#0F766E',
    fontWeight: '800',
  },
});
