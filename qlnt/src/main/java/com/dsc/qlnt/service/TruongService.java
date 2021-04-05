package com.dsc.qlnt.service;

import java.util.List;
import com.dsc.qlnt.model.Truong;

public interface TruongService {
	public Truong luuThongTinTruong(Truong truong);
	public List<Truong> layDanhSachTruong();
	public List<Truong> layDanhSachTruong(String tenTruong, String diaChi, Integer id);
	void xoaTruong(Integer id); 
}
