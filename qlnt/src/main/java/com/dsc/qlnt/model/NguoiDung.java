package com.dsc.qlnt.model;
// Generated Mar 26, 2021 10:06:33 PM by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * NguoiDung generated by hbm2java
 */
@Entity
@Table(name = "nguoi_dung", uniqueConstraints = @UniqueConstraint(columnNames = "TEN_DANG_NHAP"))
public class NguoiDung implements java.io.Serializable {

	private Integer idNguoiDung;
	private VaiTro vaiTro;
	private String tenDangNhap;
	private String matKhau;
	private String hoTen;
	private boolean khoa;

	public NguoiDung() {
	}

	public NguoiDung(VaiTro vaiTro, String tenDangNhap, String matKhau, String hoTen, boolean khoa) {
		this.vaiTro = vaiTro;
		this.tenDangNhap = tenDangNhap;
		this.matKhau = matKhau;
		this.hoTen = hoTen;
		this.khoa = khoa;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "ID_NGUOI_DUNG", unique = true, nullable = false)
	public Integer getIdNguoiDung() {
		return this.idNguoiDung;
	}

	public void setIdNguoiDung(Integer idNguoiDung) {
		this.idNguoiDung = idNguoiDung;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_VAI_TRO", nullable = false)
	public VaiTro getVaiTro() {
		return this.vaiTro;
	}

	public void setVaiTro(VaiTro vaiTro) {
		this.vaiTro = vaiTro;
	}

	@Column(name = "TEN_DANG_NHAP", unique = true, nullable = false, length = 50)
	public String getTenDangNhap() {
		return this.tenDangNhap;
	}

	public void setTenDangNhap(String tenDangNhap) {
		this.tenDangNhap = tenDangNhap;
	}

	@Column(name = "MAT_KHAU", nullable = false, length = 100)
	public String getMatKhau() {
		return this.matKhau;
	}

	public void setMatKhau(String matKhau) {
		this.matKhau = matKhau;
	}

	@Column(name = "HO_TEN", nullable = false, length = 50)
	public String getHoTen() {
		return this.hoTen;
	}

	public void setHoTen(String hoTen) {
		this.hoTen = hoTen;
	}

	@Column(name = "KHOA", nullable = false)
	public boolean isKhoa() {
		return this.khoa;
	}

	public void setKhoa(boolean khoa) {
		this.khoa = khoa;
	}

}
