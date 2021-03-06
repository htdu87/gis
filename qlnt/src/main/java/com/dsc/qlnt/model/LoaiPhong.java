package com.dsc.qlnt.model;
// Generated Mar 27, 2021 12:16:42 AM by Hibernate Tools 4.3.5.Final

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * LoaiPhong generated by hbm2java
 */
@Entity
@Table(name = "loai_phong")
public class LoaiPhong implements java.io.Serializable {

	private Integer idLoaiPhong;
	private KhuTro khuTro;
	private String tenLoaiPhong;
	private int soNguoiO;
	private float dienTich;
	private boolean coGac;
	private String moTa;
	private Set<GiaThue> giaThues = new HashSet<GiaThue>(0);
	private Set<PhongTro> phongTros = new HashSet<PhongTro>(0);

	public LoaiPhong() {
	}

	public LoaiPhong(KhuTro khuTro, String tenLoaiPhong, int soNguoiO, float dienTich, boolean coGac) {
		this.khuTro = khuTro;
		this.tenLoaiPhong = tenLoaiPhong;
		this.soNguoiO = soNguoiO;
		this.dienTich = dienTich;
		this.coGac = coGac;
	}

	public LoaiPhong(KhuTro khuTro, String tenLoaiPhong, int soNguoiO, float dienTich, boolean coGac, String moTa,
			Set<GiaThue> giaThues, Set<PhongTro> phongTros) {
		this.khuTro = khuTro;
		this.tenLoaiPhong = tenLoaiPhong;
		this.soNguoiO = soNguoiO;
		this.dienTich = dienTich;
		this.coGac = coGac;
		this.moTa = moTa;
		this.giaThues = giaThues;
		this.phongTros = phongTros;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "ID_LOAI_PHONG", unique = true, nullable = false)
	public Integer getIdLoaiPhong() {
		return this.idLoaiPhong;
	}

	public void setIdLoaiPhong(Integer idLoaiPhong) {
		this.idLoaiPhong = idLoaiPhong;
	}

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_KHU_TRO", nullable = false)
	public KhuTro getKhuTro() {
		return this.khuTro;
	}

	public void setKhuTro(KhuTro khuTro) {
		this.khuTro = khuTro;
	}

	@Column(name = "TEN_LOAI_PHONG", nullable = false, length = 150)
	public String getTenLoaiPhong() {
		return this.tenLoaiPhong;
	}

	public void setTenLoaiPhong(String tenLoaiPhong) {
		this.tenLoaiPhong = tenLoaiPhong;
	}

	@Column(name = "SO_NGUOI_O", nullable = false)
	public int getSoNguoiO() {
		return this.soNguoiO;
	}

	public void setSoNguoiO(int soNguoiO) {
		this.soNguoiO = soNguoiO;
	}

	@Column(name = "DIEN_TICH", nullable = false, precision = 12, scale = 0)
	public float getDienTich() {
		return this.dienTich;
	}

	public void setDienTich(float dienTich) {
		this.dienTich = dienTich;
	}

	@Column(name = "CO_GAC", nullable = false)
	public boolean isCoGac() {
		return this.coGac;
	}

	public void setCoGac(boolean coGac) {
		this.coGac = coGac;
	}

	@Column(name = "MO_TA", length = 500)
	public String getMoTa() {
		return this.moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "loaiPhong",cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("ngayApDung desc")
	public Set<GiaThue> getGiaThues() {
		return this.giaThues;
	}

	public void setGiaThues(Set<GiaThue> giaThues) {
		this.giaThues = giaThues;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "loaiPhong")
	public Set<PhongTro> getPhongTros() {
		return this.phongTros;
	}

	public void setPhongTros(Set<PhongTro> phongTros) {
		this.phongTros = phongTros;
	}

	@Transient
	public long getGiaThueHienTai() {
		return giaThues.iterator().next().getGiaThue();
	}

	@Transient
	public int getIdGiaThueHienTai() {
		return giaThues.iterator().next().getIdGiaThue();
	}

	@Transient
	public Date getNgayApDungGiaThueHienTai() {
		return giaThues.iterator().next().getNgayApDung();
	}
}
