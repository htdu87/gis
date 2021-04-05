package com.dsc.qlnt.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsc.qlnt.model.Truong;
import com.dsc.qlnt.repository.TruongRepository;

@Service
public class TruongServiceImp implements TruongService {
	
	@Autowired
	private TruongRepository truongRepo;
	
	@Override
	public Truong luuThongTinTruong(Truong truong) {		
		return truongRepo.save(truong);
	}

	@Override
	public List<Truong> layDanhSachTruong() {
		List<Truong> truong = new ArrayList<>();
		truongRepo.findAll().forEach(truong::add);
		return truong;
	}
	
	

	@Override
	public void xoaTruong(Integer id) {
		truongRepo.deleteById(id);		
	}

	@Override
	public List<Truong> layDanhSachTruong(String tenTruong, String diaChi, Integer id) {		
		return truongRepo.search(tenTruong, diaChi, id);
	}

	
	
}
