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
 * Truong generated by hbm2java
 */
@Entity
@Table(name = "truong")
public class Truong implements java.io.Serializable {

	private Integer idTruong;
	private XaPhuong xaPhuong;
	private String tenTruong;
	private String diaChi;
	private double kinhDo;
	private double viDo;
	private String icon;
	private Set<KhoangCach> khoangCaches = new HashSet<KhoangCach>(0);

	public Truong() {
	}

	public Truong(XaPhuong xaPhuong, String tenTruong, String diaChi, double kinhDo, double viDo, String icon) {
		this.xaPhuong = xaPhuong;
		this.tenTruong = tenTruong;
		this.diaChi = diaChi;
		this.kinhDo = kinhDo;
		this.viDo = viDo;
		this.icon = icon;
	}

	public Truong(XaPhuong xaPhuong, String tenTruong, String diaChi, double kinhDo, double viDo, String icon,
			Set<KhoangCach> khoangCaches) {
		this.xaPhuong = xaPhuong;
		this.tenTruong = tenTruong;
		this.diaChi = diaChi;
		this.kinhDo = kinhDo;
		this.viDo = viDo;
		this.icon = icon;
		this.khoangCaches = khoangCaches;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "ID_TRUONG", unique = true, nullable = false)
	public Integer getIdTruong() {
		return this.idTruong;
	}

	public void setIdTruong(Integer idTruong) {
		this.idTruong = idTruong;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_XA_PHUONG", nullable = false)
	public XaPhuong getXaPhuong() {
		return this.xaPhuong;
	}

	public void setXaPhuong(XaPhuong xaPhuong) {
		this.xaPhuong = xaPhuong;
	}

	@Column(name = "TEN_TRUONG", nullable = false, length = 150)
	public String getTenTruong() {
		return this.tenTruong;
	}

	public void setTenTruong(String tenTruong) {
		this.tenTruong = tenTruong;
	}

	@Column(name = "DIA_CHI", nullable = false, length = 200)
	public String getDiaChi() {
		return this.diaChi;
	}

	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}

	@Column(name = "KINH_DO", nullable = false, precision = 22, scale = 0)
	public double getKinhDo() {
		return this.kinhDo;
	}

	public void setKinhDo(double kinhDo) {
		this.kinhDo = kinhDo;
	}

	@Column(name = "VI_DO", nullable = false, precision = 22, scale = 0)
	public double getViDo() {
		return this.viDo;
	}

	public void setViDo(double viDo) {
		this.viDo = viDo;
	}

	@Column(name = "ICON", nullable = false, length = 200)
	public String getIcon() {
		return this.icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "truong")
	public Set<KhoangCach> getKhoangCaches() {
		return this.khoangCaches;
	}

	public void setKhoangCaches(Set<KhoangCach> khoangCaches) {
		this.khoangCaches = khoangCaches;
	}

}
