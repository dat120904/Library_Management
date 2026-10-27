import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import ReaderLogin from '@/views/ReaderLogin.vue';
import StaffLogin from '@/views/StaffLogin.vue';
import AdminLogin from '@/views/AdminLogin.vue';
import ThuVienOnline from '@/views/ThuVienOnline.vue';
import DangKyMuonSachTrucTiep from '@/views/DangKyMuonSachTrucTiep.vue';
import TimThongTinMuonSach from '@/views/TimThongTinMuonSach.vue';
import DanhSachDonDangKyMuon from '@/views/DanhSachDonDangKyMuon.vue';
import CapNhatSoLuongSach from '@/views/CapNhatSoLuongSach.vue';
import ThemSach from '@/views/ThemSach.vue';
import ThemNhaXuatBan from '@/views/ThemNhaXuatBan.vue';
import ThemDocGia from '@/views/ThemDocGia.vue';
import ThemNhanVien from '@/views/ThemNhanVien.vue';
import DocGiaXemDanhSachDaMuon from '@/views/DocGiaXemSachDaMuon.vue';
import YeuCauTraSachTuDocGia from '@/views/YeuCauTraSachTuDocGia.vue';
import NhanVienDuyetTraSach from '@/views/NhanVienDuyetTraSach.vue';
const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/ReaderLogin', name: 'ReaderLogin', component: ReaderLogin },
    { path: '/StaffLogin', name: 'StaffLogin', component: StaffLogin },
    { path: '/AdminLogin', name: 'AdminLogin', component: AdminLogin },
    { path: '/ThuVienOnline', name: 'ThuVienOnline', component: ThuVienOnline },
    { path: '/DangKyMuonSachTrucTiep', name: 'DangKyMuonSachTrucTiep', component: DangKyMuonSachTrucTiep },
    { path: '/DanhSachDonDangKyMuon', name: 'DanhSachDonDangKyMuon', component: DanhSachDonDangKyMuon },
    { path: '/TimThongTinMuonSach', name: 'TimThongTinMuonSach', component: TimThongTinMuonSach },
    { path: '/CapNhatSoLuongSach', name: 'CapNhatSoLuongSach', component: CapNhatSoLuongSach },
    { path: '/ThemSach', name: 'ThemSach', component: ThemSach },
    { path: '/ThemNhaXuatBan', name: 'ThemNhaXuatBan', component: ThemNhaXuatBan },
    { path: '/ThemDocGia', name: 'ThemDocGia', component: ThemDocGia },
    { path: '/ThemNhanVien', name: 'ThemNhanVien', component: ThemNhanVien },
    { path: '/DocGiaXemDanhSachDaMuon', name: 'DocGiaXemDanhSachDaMuon', component: DocGiaXemDanhSachDaMuon },
    { path: '/YeuCauTraSachTuDocGia', name: 'YeuCauTraSachTuDocGia', component: YeuCauTraSachTuDocGia },
    { path: '/NhanVienDuyetTraSach', name: 'NhanVienDuyetTraSach', component: NhanVienDuyetTraSach },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;