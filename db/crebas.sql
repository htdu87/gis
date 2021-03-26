/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     26/03/2021 9:27:37 PM                        */
/*==============================================================*/


drop table if exists CHU_KHU_TRO;

drop table if exists GIA_THUE;

drop table if exists KHOANG_CACH;

drop table if exists KHU_TRO;

drop table if exists LOAI_PHONG;

drop index MENU_UN on MENU;

drop table if exists MENU;

drop table if exists MENU_VAI_TRO;

drop index NGUOI_DUNG_UN on NGUOI_DUNG;

drop table if exists NGUOI_DUNG;

drop table if exists PHONG_TRO;

drop table if exists QUAN_HUYEN;

drop table if exists TINH_TP;

drop table if exists TINH_TRANG;

drop table if exists TRUONG;

drop table if exists VAI_TRO;

drop table if exists XA_PHUONG;

/*==============================================================*/
/* Table: CHU_KHU_TRO                                           */
/*==============================================================*/
create table CHU_KHU_TRO
(
   ID_CHU_KHU_TRO       int not null auto_increment,
   HO_TEN               varchar(50) not null,
   NU                   bool not null,
   NAM_SINH             date,
   SDT                  varchar(50) not null,
   primary key (ID_CHU_KHU_TRO)
);

/*==============================================================*/
/* Table: GIA_THUE                                              */
/*==============================================================*/
create table GIA_THUE
(
   ID_GIA_THUE          int not null auto_increment,
   ID_LOAI_PHONG        int not null,
   GIA_THUE             decimal not null,
   NGAY_AP_DUNG         date not null,
   primary key (ID_GIA_THUE)
);

/*==============================================================*/
/* Table: KHOANG_CACH                                           */
/*==============================================================*/
create table KHOANG_CACH
(
   ID_TRUONG            int not null,
   ID_KHU_TRO           int not null,
   KHOANG_CACH          float not null,
   primary key (ID_TRUONG, ID_KHU_TRO)
);

/*==============================================================*/
/* Table: KHU_TRO                                               */
/*==============================================================*/
create table KHU_TRO
(
   ID_KHU_TRO           int not null auto_increment,
   ID_CHU_KHU_TRO       int not null,
   ID_XA_PHUONG         int not null,
   TEN_KHU_TRO          varchar(150) not null,
   DIA_CHI              varchar(200) not null,
   KINH_DO              float not null,
   VI_DO                float not null,
   primary key (ID_KHU_TRO)
);

/*==============================================================*/
/* Table: LOAI_PHONG                                            */
/*==============================================================*/
create table LOAI_PHONG
(
   ID_LOAI_PHONG        int not null auto_increment,
   ID_KHU_TRO           int not null,
   TEN_LOAI_PHONG       varchar(150) not null,
   SO_NGUOI_O           int not null,
   DIEN_TICH            float not null,
   CO_GAC               bool not null,
   MO_TA                varchar(500),
   primary key (ID_LOAI_PHONG)
);

/*==============================================================*/
/* Table: MENU                                                  */
/*==============================================================*/
create table MENU
(
   ID_MENU              int not null,
   MEN_ID_MENU          int,
   TEN_MENU             varchar(150) not null,
   URL                  varchar(200),
   ICON                 varchar(200),
   HIEN_THI             bool not null,
   primary key (ID_MENU)
);

/*==============================================================*/
/* Index: MENU_UN                                               */
/*==============================================================*/
create unique index MENU_UN on MENU
(
   URL
);

/*==============================================================*/
/* Table: MENU_VAI_TRO                                          */
/*==============================================================*/
create table MENU_VAI_TRO
(
   ID_VAI_TRO           int not null,
   ID_MENU              int not null,
   primary key (ID_VAI_TRO, ID_MENU)
);

/*==============================================================*/
/* Table: NGUOI_DUNG                                            */
/*==============================================================*/
create table NGUOI_DUNG
(
   ID_NGUOI_DUNG        int not null auto_increment,
   ID_VAI_TRO           int not null,
   TEN_DANG_NHAP        varchar(50) not null,
   MAT_KHAU             varchar(100) not null,
   HO_TEN               varchar(50) not null,
   KHOA                 bool not null default 0,
   primary key (ID_NGUOI_DUNG)
);

/*==============================================================*/
/* Index: NGUOI_DUNG_UN                                         */
/*==============================================================*/
create unique index NGUOI_DUNG_UN on NGUOI_DUNG
(
   TEN_DANG_NHAP
);

/*==============================================================*/
/* Table: PHONG_TRO                                             */
/*==============================================================*/
create table PHONG_TRO
(
   ID_PHONG_TRO         int not null auto_increment,
   ID_LOAI_PHONG        int not null,
   ID_TINH_TRANG        int not null,
   STT_PHONG            varchar(10) not null,
   primary key (ID_PHONG_TRO)
);

/*==============================================================*/
/* Table: QUAN_HUYEN                                            */
/*==============================================================*/
create table QUAN_HUYEN
(
   ID_QUAN_HUYEN        int not null auto_increment,
   ID_TINH_TP           int not null,
   TEN_QUAN_HUYEN       varchar(150) not null,
   POLYGON              varchar(50),
   primary key (ID_QUAN_HUYEN)
);

/*==============================================================*/
/* Table: TINH_TP                                               */
/*==============================================================*/
create table TINH_TP
(
   ID_TINH_TP           int not null auto_increment,
   TEN_TINH_TP          varchar(150) not null,
   POLYGON              varchar(50),
   primary key (ID_TINH_TP)
);

/*==============================================================*/
/* Table: TINH_TRANG                                            */
/*==============================================================*/
create table TINH_TRANG
(
   ID_TINH_TRANG        int not null,
   TEN_TINH_TRANG       varchar(50) not null,
   primary key (ID_TINH_TRANG)
);

/*==============================================================*/
/* Table: TRUONG                                                */
/*==============================================================*/
create table TRUONG
(
   ID_TRUONG            int not null auto_increment,
   ID_XA_PHUONG         int not null,
   TEN_TRUONG           varchar(150) not null,
   DIA_CHI              varchar(200) not null,
   KINH_DO              float not null,
   VI_DO                float not null,
   ICON                 varchar(200) not null,
   primary key (ID_TRUONG)
);

/*==============================================================*/
/* Table: VAI_TRO                                               */
/*==============================================================*/
create table VAI_TRO
(
   ID_VAI_TRO           int not null,
   TEN_VAI_TRO          varchar(50) not null,
   primary key (ID_VAI_TRO)
);

/*==============================================================*/
/* Table: XA_PHUONG                                             */
/*==============================================================*/
create table XA_PHUONG
(
   ID_XA_PHUONG         int not null auto_increment,
   ID_QUAN_HUYEN        int not null,
   TEN_XA_PHUONG        varchar(150) not null,
   POLYGON              varchar(50),
   primary key (ID_XA_PHUONG)
);

alter table GIA_THUE add constraint FK_LP_CO_GIA_THUE foreign key (ID_LOAI_PHONG)
      references LOAI_PHONG (ID_LOAI_PHONG) on delete restrict on update restrict;

alter table KHOANG_CACH add constraint FK_KHOANG_CACH foreign key (ID_TRUONG)
      references TRUONG (ID_TRUONG) on delete restrict on update restrict;

alter table KHOANG_CACH add constraint FK_KHOANG_CACH2 foreign key (ID_KHU_TRO)
      references KHU_TRO (ID_KHU_TRO) on delete restrict on update restrict;

alter table KHU_TRO add constraint FK_KH_THUOC_XP foreign key (ID_XA_PHUONG)
      references XA_PHUONG (ID_XA_PHUONG) on delete restrict on update restrict;

alter table KHU_TRO add constraint FK_KT_CUA_CT foreign key (ID_CHU_KHU_TRO)
      references CHU_KHU_TRO (ID_CHU_KHU_TRO) on delete restrict on update restrict;

alter table LOAI_PHONG add constraint FK_KT_CO_LP foreign key (ID_KHU_TRO)
      references KHU_TRO (ID_KHU_TRO) on delete restrict on update restrict;

alter table MENU add constraint FK_MENU_CHA foreign key (MEN_ID_MENU)
      references MENU (ID_MENU) on delete restrict on update restrict;

alter table MENU_VAI_TRO add constraint FK_MENU_VAI_TRO foreign key (ID_VAI_TRO)
      references VAI_TRO (ID_VAI_TRO) on delete restrict on update restrict;

alter table MENU_VAI_TRO add constraint FK_MENU_VAI_TRO2 foreign key (ID_MENU)
      references MENU (ID_MENU) on delete restrict on update restrict;

alter table NGUOI_DUNG add constraint FK_ND_CO_VAI_TRO foreign key (ID_VAI_TRO)
      references VAI_TRO (ID_VAI_TRO) on delete restrict on update restrict;

alter table PHONG_TRO add constraint FK_PT_CO_TT foreign key (ID_TINH_TRANG)
      references TINH_TRANG (ID_TINH_TRANG) on delete restrict on update restrict;

alter table PHONG_TRO add constraint FK_PT_THUOC_LP foreign key (ID_LOAI_PHONG)
      references LOAI_PHONG (ID_LOAI_PHONG) on delete restrict on update restrict;

alter table QUAN_HUYEN add constraint FK_QH_THUOC_TTP foreign key (ID_TINH_TP)
      references TINH_TP (ID_TINH_TP) on delete restrict on update restrict;

alter table TRUONG add constraint FK_TRUONG_THUOC_XP foreign key (ID_XA_PHUONG)
      references XA_PHUONG (ID_XA_PHUONG) on delete restrict on update restrict;

alter table XA_PHUONG add constraint FK_XP_THUOC_QH foreign key (ID_QUAN_HUYEN)
      references QUAN_HUYEN (ID_QUAN_HUYEN) on delete restrict on update restrict;

