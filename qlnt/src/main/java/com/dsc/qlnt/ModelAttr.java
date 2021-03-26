package com.dsc.qlnt;


import com.dsc.qlnt.model.NguoiDung;

public class ModelAttr {
    private String title;
    private String content;
    private String[] js;
    private String[] css;
    private NguoiDung nguoiDung;

    public ModelAttr() {
    }

    public ModelAttr(NguoiDung nguoiDung, String title, String content, String[] js){
        this.nguoiDung=nguoiDung;
        this.title=title;
        this.content=content;
        this.js=js;
        this.css=new String[]{};
    }

    public ModelAttr(NguoiDung nguoiDung,String title, String content, String[] js, String[]css){
        this.nguoiDung=nguoiDung;
        this.title=title;
        this.content=content;
        this.js=js;
        this.css=css;
    }

    public ModelAttr(NguoiDung nguoiDung,String title, String content){
        this.nguoiDung=nguoiDung;
        this.title=title;
        this.content=content;
        this.js=new String[]{};
        this.css=new String[]{};
    }

    public NguoiDung getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(NguoiDung nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String[] getJs() {
        return js;
    }

    public void setJs(String[] js) {
        this.js = js;
    }

    public String[] getCss() {
        return css;
    }

    public void setCss(String[] css) {
        this.css = css;
    }
}
