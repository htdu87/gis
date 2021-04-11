package com.dsc.qlnt.model;
// Generated Mar 27, 2021 12:16:42 AM by Hibernate Tools 4.3.5.Final

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * KhoangCach generated by hbm2java
 */
@Entity
@Table(name = "khoang_cach")
public class KhoangCach implements java.io.Serializable {

	private KhoangCachId id;
	private KhuTro khuTro;
	private Truong truong;
	private float khoangCach;

	public KhoangCach() {
	}

	public KhoangCach(KhoangCachId id, KhuTro khuTro, Truong truong, float khoangCach) {
		this.id = id;
		this.khuTro = khuTro;
		this.truong = truong;
		this.khoangCach = khoangCach;
	}

	@EmbeddedId

	@AttributeOverrides({ @AttributeOverride(name = "idTruong", column = @Column(name = "ID_TRUONG", nullable = false)),
			@AttributeOverride(name = "idKhuTro", column = @Column(name = "ID_KHU_TRO", nullable = false)) })
	public KhoangCachId getId() {
		return this.id;
	}

	public void setId(KhoangCachId id) {
		this.id = id;
	}

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_KHU_TRO", nullable = false, insertable = false, updatable = false)
	public KhuTro getKhuTro() {
		return this.khuTro;
	}

	public void setKhuTro(KhuTro khuTro) {
		this.khuTro = khuTro;
	}

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_TRUONG", nullable = false, insertable = false, updatable = false)
	public Truong getTruong() {
		return this.truong;
	}

	public void setTruong(Truong truong) {
		this.truong = truong;
	}

	@Column(name = "KHOANG_CACH", nullable = false, precision = 12, scale = 0)
	public float getKhoangCach() {
		return this.khoangCach;
	}

	public void setKhoangCach(float khoangCach) {
		this.khoangCach = khoangCach;
	}

	@Transient
	public String getTenTruong() {
		return truong.getTenTruong();
	}
}
