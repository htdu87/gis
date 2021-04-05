package com.dsc.qlnt;

public class Response {
    private int resCode;
    private String resMsg;
    private Object resData;

    public Response() {
    }

    public Response(int resCode) {
        this.resCode = resCode;
    }

    public Response(int resCode, String resMsg) {
        this.resCode = resCode;
        this.resMsg = resMsg;
    }

    public Response(int resCode, Object resData) {
        this.resCode = resCode;
        this.resData = resData;
    }

    public Response(int resCode, String resMsg, Object resData) {
        this.resCode = resCode;
        this.resMsg = resMsg;
        this.resData = resData;
    }

    public int getResCode() {
        return resCode;
    }

    public void setResCode(int resCode) {
        this.resCode = resCode;
    }

    public String getResMsg() {
        return resMsg;
    }

    public void setResMsg(String resMsg) {
        this.resMsg = resMsg;
    }

    public Object getResData() {
        return resData;
    }

    public void setResData(Object resData) {
        this.resData = resData;
    }
}
