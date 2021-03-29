package com.dsc.qlnt.model;
// Generated Mar 27, 2021 12:16:42 AM by Hibernate Tools 4.3.5.Final

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * XaPhuong generated by hbm2java
 */
@Entity
@Table(name = "xa_phuong")
public class XaPhuong implements java.io.Serializable {

	private Integer idXaPhuong;
	private QuanHuyen quanHuyen;
	private String tenXaPhuong;
	private String polygon;
	private Set<KhuTro> khuTros = new HashSet<KhuTro>(0);
	private Set<Truong> truongs = new HashSet<Truong>(0);

	public XaPhuong() {
	}

	public XaPhuong(QuanHuyen quanHuyen, String tenXaPhuong) {
		this.quanHuyen = quanHuyen;
		this.tenXaPhuong = tenXaPhuong;
	}

	public XaPhuong(QuanHuyen quanHuyen, String tenXaPhuong, String polygon, Set<KhuTro> khuTros, Set<Truong> truongs) {
		this.quanHuyen = quanHuyen;
		this.tenXaPhuong = tenXaPhuong;
		this.polygon = polygon;
		this.khuTros = khuTros;
		this.truongs = truongs;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "ID_XA_PHUONG", unique = true, nullable = false)
	public Integer getIdXaPhuong() {
		return this.idXaPhuong;
	}

	public void setIdXaPhuong(Integer idXaPhuong) {
		this.idXaPhuong = idXaPhuong;
	}

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_QUAN_HUYEN", nullable = false)
	public QuanHuyen getQuanHuyen() {
		return this.quanHuyen;
	}

	public void setQuanHuyen(QuanHuyen quanHuyen) {
		this.quanHuyen = quanHuyen;
	}

	@Column(name = "TEN_XA_PHUONG", nullable = false, length = 150)
	public String getTenXaPhuong() {
		return this.tenXaPhuong;
	}

	public void setTenXaPhuong(String tenXaPhuong) {
		this.tenXaPhuong = tenXaPhuong;
	}

	@Column(name = "POLYGON")
	public String getPolygon() {
		return this.polygon;
	}

	public void setPolygon(String polygon) {
		this.polygon = polygon;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "xaPhuong")
	public Set<KhuTro> getKhuTros() {
		return this.khuTros;
	}

	public void setKhuTros(Set<KhuTro> khuTros) {
		this.khuTros = khuTros;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "xaPhuong")
	public Set<Truong> getTruongs() {
		return this.truongs;
	}

	public void setTruongs(Set<Truong> truongs) {
		this.truongs = truongs;
	}

}
