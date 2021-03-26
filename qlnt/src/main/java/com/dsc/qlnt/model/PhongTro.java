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

/**
 * PhongTro generated by hbm2java
 */
@Entity
@Table(name = "phong_tro")
public class PhongTro implements java.io.Serializable {

	private Integer idPhongTro;
	private LoaiPhong loaiPhong;
	private TinhTrang tinhTrang;
	private String sttPhong;

	public PhongTro() {
	}

	public PhongTro(LoaiPhong loaiPhong, TinhTrang tinhTrang, String sttPhong) {
		this.loaiPhong = loaiPhong;
		this.tinhTrang = tinhTrang;
		this.sttPhong = sttPhong;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "ID_PHONG_TRO", unique = true, nullable = false)
	public Integer getIdPhongTro() {
		return this.idPhongTro;
	}

	public void setIdPhongTro(Integer idPhongTro) {
		this.idPhongTro = idPhongTro;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_LOAI_PHONG", nullable = false)
	public LoaiPhong getLoaiPhong() {
		return this.loaiPhong;
	}

	public void setLoaiPhong(LoaiPhong loaiPhong) {
		this.loaiPhong = loaiPhong;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_TINH_TRANG", nullable = false)
	public TinhTrang getTinhTrang() {
		return this.tinhTrang;
	}

	public void setTinhTrang(TinhTrang tinhTrang) {
		this.tinhTrang = tinhTrang;
	}

	@Column(name = "STT_PHONG", nullable = false, length = 10)
	public String getSttPhong() {
		return this.sttPhong;
	}

	public void setSttPhong(String sttPhong) {
		this.sttPhong = sttPhong;
	}

}
