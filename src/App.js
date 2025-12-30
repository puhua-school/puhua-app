import React, { useState, useEffect } from 'react';
import {
  Menu, X, User, LogOut, Settings,
  List, PlusCircle, CheckSquare,
  AlertCircle, ChevronRight, Home,
  Shield, Briefcase, Camera, MapPin,
  Clock, Tag, Trash2, ArrowLeft, CheckCircle2,
  Lock, Eye, EyeOff, ClipboardList, UserPlus, Bell
} from 'lucide-react';

/**
 * DATA MASTER & KONFIGURASI
 */
const masterJobs = {
  'JOB001': 'Laoshi',
  'JOB002': 'Staf Non-Akademik',
  'JOB003': 'Staf IT',
  'JOB004': 'Sarpras'
};

const initialUsers = [
  { user_id: 1, username: 'admin', password: '123', pemilik_name: 'Super Admin', level_id: 1, job_id: 'JOB003' },
  { user_id: 2, username: 'sarpras', password: '123', pemilik_name: 'Mr. Nanang', level_id: 2, job_id: 'JOB004' },
  { user_id: 3, username: 'ronny', password: '123', pemilik_name: 'Ronny Laoshi', level_id: 3, job_id: 'JOB001' },
];

const initialQueues = []; //Menampung array aduan

const initialMenuConfig = {
  dashboard: { label: 'Beranda', icon: Home, levels: [1, 2, 3] },
  create_complaint: { label: 'Buat Aduan', icon: PlusCircle, levels: [1, 3] },
  queue_list: { label: 'Daftar Aduan', icon: List, levels: [1, 2, 3] },
  task_list: { label: 'Tugas Saya', icon: CheckSquare, levels: [1, 2] },
  admin_settings: { label: 'Manajemen Sistem', icon: Settings, levels: [1] },
};

/**
 * KOMPONEN UI DASAR
 */
const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  const baseStyle = "w-full py-3 px-4 rounded-xl font-bold text-sm transition duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-200",
    secondary: "bg-white border-2 border-gray-100 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-100",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-100",
    warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-100"
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

const Badge = ({ status }) => {
  const styles = {
    'Menunggu': 'bg-amber-50 text-amber-700 border-amber-100',
    'Sedang Dikerjakan': 'bg-blue-50 text-blue-700 border-blue-100',
    'Menunggu Verifikasi': 'bg-purple-50 text-purple-700 border-purple-100',
    'Selesai': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${styles[status] || 'bg-gray-50'}`}>{status}</span>;
};

/**
 * HALAMAN LOGIN
 */
const LoginPage = ({ onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      onLogin(foundUser, rememberMe);
    } else {
      setError('Username atau password salah');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50px-4 py-8sm:px-8 sm:py-0
                    justify-center animate-in fade-in duration-700">
      <div className="mb-10 text-center">
        <div className="mx-auto flex items-center justify-center mb-6">
          <img
            src="/image/puhua_logo.png"
            alt="Logo"
            className="
    h-20
    sm:h-24
    md:h-28
    lg:h-32
    w-auto
    mx-auto
  "
          />


        </div>
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter">Puhua Maintenance</h1>
        <p className="text-gray-400 mt-2 text-sm font-medium">Silakan masuk untuk melapor</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl flex items-center gap-2">
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Username</label>
          <input
            type="text"
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none shadow-sm transition-all"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Password</label>
          <input
            type="password"
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none shadow-sm transition-all"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="remember" className="text-xs font-bold text-slate-500 cursor-pointer select-none">
            Tetap login selama 10 hari
          </label>
        </div>

        <div className="pt-4">
          <Button type="submit" className="py-4 text-lg">MASUK</Button>
        </div>
      </form>
    </div>
  );
};

/**
 * HALAMAN UTAMA
 */
export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [queues, setQueues] = useState(initialQueues);
  const [users, setUsers] = useState(initialUsers);
  const [selected, setSelected] = useState(null);
  const [menuConfig, setMenuConfig] = useState(initialMenuConfig);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [previewImage, setPreviewImage] = useState(null);
  const hasImage = Boolean(selected?.image);

  // Load Session & Notifikasi
  useEffect(() => {
    // 1. Cek Login Session
    const savedSession = localStorage.getItem('puhua_session');
    if (savedSession) {
      const { user: userData, expiry } = JSON.parse(savedSession);
      if (new Date().getTime() < expiry) {
        setUser(userData);
      } else {
        localStorage.removeItem('puhua_session');
      }
    }

    // 2. Minta Izin Notifikasi
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }


  }, []);

  // Request Notification Permission
  const requestNotify = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  };

  // Push Notification Logic
  const triggerNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: '/image/puhua_logo.png'
      });
    }
  };

  const emptyUserForm = {
    username: '',
    password: '',
    confirmPassword: '',
    pemilik_name: '',
    job_id: 'JOB004',
    level_id: '3'
  };

  const [newUserForm, setNewUserForm] = useState(emptyUserForm);

  const handleLogin = (userData, remember) => {
    setSelected(null);
    setView('dashboard');
    setUser(userData);

    if (remember) {
      const expiry = new Date().getTime() + (10 * 24 * 60 * 60 * 1000); // 10 Hari
      localStorage.setItem('puhua_session', JSON.stringify({ user: userData, expiry }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('puhua_session');
    setUser(null);
    setView('dashboard');
    setSelected(null);
    setMenuOpen(false);
    setNewUserForm(emptyUserForm);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setQueues(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
    setSelected(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Batalkan aduan ini?")) {
      setQueues(prev => prev.filter(q => q.id !== id));
      setSelected(null);
    }
  };

  /*const handleCreate = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      title: e.target.title.value,
      location: e.target.location.value,
      description: e.target.description.value,
      status: 'Menunggu',
      requester: user.pemilik_name,
      date: 'Baru Saja'
    };

    setQueues([newEntry, ...queues]);

    // Trigger Notifikasi jika user saat ini adalah Pelapor Umum (Level 3)
    // Ditujukan untuk Admin (1) & Petugas (2)
    triggerNotification(
      "Aduan Baru Masuk!",
      `${newEntry.requester} melaporkan: ${newEntry.title} di ${newEntry.location}`
    );

    setView('queue_list');
  };*/

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const newEntry = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      title: e.target.title.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: previewImage, // ⬅️ SIMPAN FOTO
      status: 'Menunggu',
      requester: user.pemilik_name,
      date: 'Baru Saja'
    };

    setQueues([newEntry, ...queues]);
    setPreviewImage(null); // reset preview

    triggerNotification(
      "Aduan Baru Masuk!",
      `${newEntry.requester} melaporkan: ${newEntry.title} di ${newEntry.location}`
    );

    setView('queue_list');
  };
  const handleAddUser = (e) => {
    e.preventDefault();
    const alphaRegex = /^[A-Za-z]+$/;
    const alphanumericNoSymbolRegex = /^[A-Za-z0-9]+$/;

    if (!alphaRegex.test(newUserForm.username)) return alert("Username hanya boleh huruf.");
    if (newUserForm.username.length > 20) return alert("Username maksimal 20 karakter.");
    if (!alphanumericNoSymbolRegex.test(newUserForm.password)) return alert("Password hanya boleh huruf dan angka.");
    if (newUserForm.password !== newUserForm.confirmPassword) return alert("Konfirmasi password tidak cocok.");

    const newUser = {
      user_id: users.length + 1,
      username: newUserForm.username,
      password: newUserForm.password,
      pemilik_name: newUserForm.pemilik_name,
      level_id: parseInt(newUserForm.level_id),
      job_id: newUserForm.job_id
    };

    setUsers([...users, newUser]);
    alert("User berhasil ditambahkan!");
    setNewUserForm(emptyUserForm);
  };

  const filteredQueues = queues.filter(q => {
    if (user && user.level_id === 3) return q.requester === user.pemilik_name;
    return true;
  });

  const taskQueues = filteredQueues.filter(q => {
    // user belum siap
    if (!user) return false;

    // =========================
    // ADMIN (level_id === 1)
    // =========================
    if (user.level_id === 1) {
      // Admin hanya melihat aduan BUATANNYA SENDIRI
      return q.requester === user.pemilik_name;
    }

    // =========================
    // SARPRAS (level_id === 2)
    // =========================
    if (user.level_id === 2) {
      // Sarpras tidak melihat aduan selesai
      return q.status !== 'Selesai';
    }

    // =========================
    // UMUM (level_id === 3)
    // =========================
    if (user.level_id === 3) {
      // User umum hanya melihat aduannya sendiri
      return q.requester === user.pemilik_name;
    }

    return false;
  });



  const CurrentViewIcon = selected ? List : (menuConfig[view]?.icon || Shield);

  if (!user) return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-white h-[844px] shadow-2xl overflow-hidden sm:rounded-[3rem] border-0 sm:border-[12px] border-slate-900">
        <LoginPage onLogin={handleLogin} users={users} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <div className="
    min-h-screen
    bg-white
    flex flex-col
    max-w-full
    sm:max-w-md
    sm:mx-auto
    sm:my-6
    sm:rounded-3xl
    sm:shadow-2xl
    overflow-hidden
  ">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center sticky top-0 z-20">
          <button onClick={() => setMenuOpen(true)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors active:scale-90">
            <Menu size={24} className="text-slate-700" />
          </button>
          <h1 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] truncate px-2">
            {selected ? 'Detail Aduan' : menuConfig[view]?.label}


          </h1>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-100 shrink-0">
            <CurrentViewIcon size={20} />
          </div>
        </div>

        {/* Sidebar Menu */}
        {menuOpen && (
          <div className="absolute inset-0 z-50 flex">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity" onClick={() => setMenuOpen(false)} />
            <div className="w-[85%] sm:w-[70%] max-w-xs bg-white h-full z-50 shadow-2xl flex flex-col animate-in slide-in-from-left">
              <div className="p-6 bg-blue-700 text-white flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <img src="/image/puhua_logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-0.5">User Aktif</p>
                  <h2 className="text-lg font-black truncate leading-tight mb-1">{user.pemilik_name}</h2>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-black uppercase tracking-tighter border border-white/10">
                      {user.level_id === 1 ? 'Admin' : user.level_id === 2 ? 'Petugas' : 'Umum'}
                    </span>
                    <span className="text-[10px] text-blue-100 font-bold opacity-80 truncate max-w-[100px]">
                      • {masterJobs[user.job_id]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto no-scrollbar">
                {Object.entries(menuConfig).map(([key, cfg]) => (
                  cfg.levels.includes(user.level_id) && (
                    <button
                      key={key}
                      onClick={() => { setView(key); setMenuOpen(false); setSelected(null); }}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-sm ${view === key && !selected ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      <cfg.icon size={20} />
                      {cfg.label}
                    </button>
                  )
                ))}

                {/* Notification Permission Toggle */}
                {(user.level_id === 1 || user.level_id === 2) && (
                  <button
                    onClick={requestNotify}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-amber-600 hover:bg-amber-50 font-bold text-sm transition-all"
                  >
                    <Bell size={20} />
                    {notificationPermission === 'granted' ? 'Notifikasi Aktif' : 'Aktifkan Notifikasi'}
                  </button>
                )}

                <div className="pt-6 mt-6 border-t border-slate-50">
                  <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 font-bold text-sm transition-all">
                    <LogOut size={20} /> Keluar Akun
                  </button>
                </div>
              </div>
              <div className="p-8 border-t border-slate-50 bg-slate-50/50">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Portal Puhua</p>
                <p className="text-[9px] text-slate-400 font-medium">© 2025 All Rights Reserved.</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 pb-20 no-scrollbar">
          {selected ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-blue-700 font-black text-xs uppercase tracking-widest mb-2 active:scale-95 transition-transform">
                <ArrowLeft size={16} /> Kembali
              </button>

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block tracking-tighter">{selected.id}</span>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    {selected && (
                      <div>
                        <h2>{selected.title}</h2>
                      </div>
                    )}</h2>
                </div>
                <Badge status={selected.status} />
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><User size={18} /></div>
                    <div><p className="text-[10px] font-black text-slate-300 uppercase">Pelapor</p><p className="font-bold text-slate-700">{selected.requester}</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><MapPin size={18} /></div>
                    <div><p className="text-[10px] font-black text-slate-300 uppercase">Lokasi</p><p className="font-bold text-slate-700">{selected.location}</p></div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-300 uppercase mb-3 tracking-widest">Deskripsi Laporan</p>
                  <p className="text-slate-600 leading-relaxed font-medium">{selected.description}</p>
                  {/* PREVIEW IMAGE DI BAWAH DESKRIPSI */}
                  {selected?.image && (
                    <div className="mt-6 bg-slate-50 p-4 rounded-2xl">
                      <img
                        src={selected.image}
                        alt="Foto Pendukung"
                        className="w-full max-h-[420px] object-contain rounded-xl"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 space-y-3">
                  {user.level_id !== 3 && selected.status === 'Menunggu' && <Button onClick={() => handleUpdateStatus(selected.id, 'Sedang Dikerjakan')}>Terima & Kerjakan</Button>}
                  {user.level_id !== 3 && selected.status === 'Sedang Dikerjakan' && <Button variant="warning" onClick={() => handleUpdateStatus(selected.id, 'Menunggu Verifikasi')}>Selesaikan Tugas</Button>}
                  {selected.status === 'Menunggu Verifikasi' && (user.level_id === 1 || user.pemilik_name === selected.requester) && (
                    <Button variant="success" onClick={() => handleUpdateStatus(selected.id, 'Selesai')}>Konfirmasi Selesai</Button>
                  )}
                  {selected.status === 'Menunggu' && (user.level_id === 1 || user.pemilik_name === selected.requester) && (
                    <Button variant="danger" onClick={() => handleDelete(selected.id)}><Trash2 size={18} /> Batalkan Aduan</Button>
                  )}
                </div>
              </div>
            </div>
          ) : view === 'dashboard' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-1 leading-tight">Halo, {user.pemilik_name}</h2>
                  <p className="text-slate-400 text-sm font-medium">Sistem siap menerima laporan Anda.</p>
                </div>
                <img src="/image/puhua_logo.png" className="absolute -right-10 -bottom-1 text-white/5 w-28 h-28 sm:w-40 sm:h-40" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-transform active:scale-95">
                  <ClipboardList size={24} className="text-blue-600 mb-4" />
                  <p className="text-xl sm:text-2xl font-black text-slate-800 leading-none">{filteredQueues.length}</p>
                  <p className="text-[10px] font-black text-slate-300 uppercase mt-2 tracking-widest">Total Aduan</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-transform active:scale-95">
                  <CheckCircle2 size={24} className="text-emerald-500 mb-4" />
                  <p className="text-xl sm:text-2xl font-black text-slate-800 leading-none">{filteredQueues.filter(q => q.status === 'Selesai').length}</p>
                  <p className="text-[10px] font-black text-slate-300 uppercase mt-2 tracking-widest">Selesai</p>
                </div>
              </div>

              {menuConfig.create_complaint.levels.includes(user.level_id) && (
                <Button onClick={() => setView('create_complaint')} className="py-5 text-base rounded-[2rem] shadow-xl active:scale-[0.98]">
                  <PlusCircle size={22} /> BUAT LAPORAN BARU
                </Button>
              )}
            </div>
          ) : view === 'create_complaint' ? (
            <div className="animate-in slide-in-from-right duration-500">
              <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest mb-6 active:scale-95 transition-transform">
                <ArrowLeft size={16} /> Batal
              </button>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter mb-8">Buat Aduan</h2>
              <form onSubmit={handleCreate} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Judul Aduan</label>
                  <input name="title" required className="w-full p-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none shadow-sm font-bold transition-all" placeholder="Apa masalahnya?" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Lokasi Kejadian</label>
                  <input name="location" required className="w-full p-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none shadow-sm font-bold transition-all" placeholder="Di mana lokasinya?" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Deskripsi Detail</label>
                  <textarea name="description" required className="w-full p-4 bg-white border border-slate-100 rounded-2xl h-32 focus:ring-2 focus:ring-blue-600 outline-none shadow-sm font-medium transition-all resize-none" placeholder="Ceritakan detail masalahnya..."></textarea>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                      Foto Pendukung (Opsional)
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold cursor-pointer"
                    />

                    {previewImage && (
                      <div className="mt-3">
                        <p className="text-[10px] font-black text-slate-300 uppercase mb-2 tracking-widest">
                          Preview Foto
                        </p>
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full rounded-2xl border border-slate-100 shadow-sm object-cover"
                        />
                      </div>
                    )}
                  </div>

                </div>
                <div className="pt-4">
                  <Button type="submit" className="py-5 text-base rounded-[2rem] shadow-xl">KIRIM LAPORAN SEKARANG</Button>
                </div>
              </form>
            </div>
          ) : view === 'queue_list' ? (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">Daftar Aduan</h2>
              </div>
              <div className="space-y-4">
                {filteredQueues.length === 0 ? (
                  <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-200">
                    <AlertCircle className="mx-auto text-slate-200 mb-4" size={48} />
                    <p className="text-slate-400 font-bold">Belum ada aduan masuk</p>
                  </div>
                ) : filteredQueues.map(q => (
                  <div key={q.id} onClick={() => setSelected(q)} className="bg-white p-5 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-95">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg tracking-tighter uppercase">{q.id}</span>
                      <Badge status={q.status} />
                    </div>
                    <h3 className="text-lg font-black text-slate-800 group-hover:text-blue-700 transition-colors leading-tight mb-2">{q.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest"><MapPin size={12} /> {q.location}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : view === 'task_list' ? (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">
                  Tugas Saya
                </h2>
              </div>

              <div className="space-y-4">
                {taskQueues.length === 0 ? (
                  <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-200">
                    <CheckCircle2 className="mx-auto text-slate-200 mb-4" size={48} />
                    <p className="text-slate-400 font-bold">
                      Tidak ada tugas aktif
                    </p>
                  </div>
                ) : taskQueues.map(q => (
                  <div
                    key={q.id}
                    onClick={() => setSelected(q)}
                    className="bg-white p-5 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-95"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg tracking-tighter uppercase">
                        {q.id}
                      </span>
                      <Badge status={q.status} />
                    </div>

                    <h3 className="text-lg font-black text-slate-800 group-hover:text-blue-700 transition-colors leading-tight mb-2">
                      {q.title}
                    </h3>

                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      <MapPin size={12} /> {q.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          ) : view === 'admin_settings' ? (
            <div className="animate-in fade-in duration-500 space-y-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">Manajemen Sistem</h2>

              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 bg-blue-700 flex items-center gap-3 text-white">
                  <UserPlus size={18} />
                  <h3 className="text-sm font-black uppercase tracking-widest">Tambah Pengguna Baru</h3>
                </div>
                <form onSubmit={handleAddUser} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Username</label>
                    <input
                      value={newUserForm.username}
                      onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold transition-all"
                      placeholder="Username" required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Nama Pemilik</label>
                    <input
                      value={newUserForm.pemilik_name}
                      onChange={(e) => setNewUserForm({ ...newUserForm, pemilik_name: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold transition-all"
                      placeholder="Nama Lengkap" required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Password</label>
                      <input
                        type="password"
                        value={newUserForm.password}
                        onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold transition-all"
                        placeholder="••••••" required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Konfirmasi</label>
                      <input
                        type="password"
                        value={newUserForm.confirmPassword}
                        onChange={(e) => setNewUserForm({ ...newUserForm, confirmPassword: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold transition-all"
                        placeholder="••••••" required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Level Akses</label>
                      <div className="relative">
                        <select
                          value={newUserForm.level_id}
                          onChange={(e) => setNewUserForm({ ...newUserForm, level_id: e.target.value })}
                          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold appearance-none transition-all cursor-pointer"
                        >
                          <option value="1">Administrator</option>
                          <option value="2">Eksekutor</option>
                          <option value="3">Umum</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Pekerjaan</label>
                      <select
                        value={newUserForm.job_id}
                        onChange={(e) => setNewUserForm({ ...newUserForm, job_id: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold appearance-none transition-all cursor-pointer"
                      >
                        {Object.entries(masterJobs).map(([id, label]) => (
                          <option key={id} value={id}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">SIMPAN PENGGUNA</Button>
                </form>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-10">
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                  <Lock size={18} className="text-slate-400" />
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hak Akses Menu</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {Object.entries(menuConfig).map(([key, cfg]) => (
                    <div key={key} className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-blue-600"><cfg.icon size={16} /></div>
                        <span className="font-black text-slate-700 text-sm">{cfg.label}</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3].map(lvl => (
                          <button
                            key={lvl}
                            onClick={() => {
                              const newLevels = cfg.levels.includes(lvl) ? cfg.levels.filter(l => l !== lvl) : [...cfg.levels, lvl];
                              setMenuConfig({ ...menuConfig, [key]: { ...cfg, levels: newLevels } });
                            }}
                            className={`flex-1 py-2 px-1 rounded-xl text-[9px] font-black border transition-all ${cfg.levels.includes(lvl) ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' : 'bg-white border-slate-100 text-slate-300'}`}
                          >
                            {lvl === 1 ? 'ADMIN' : lvl === 2 ? 'PETUGAS' : 'UMUM'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Home Indicator (iOS Style) */}
        <div className="h-1.5 w-32 bg-slate-200 rounded-full mx-auto my-3 shrink-0"></div>
      </div>
    </div>
  );
}



