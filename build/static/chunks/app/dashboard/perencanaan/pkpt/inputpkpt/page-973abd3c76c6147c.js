(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5894],{18045:function(a,e,n){Promise.resolve().then(n.bind(n,53514))},27648:function(a,e,n){"use strict";n.d(e,{default:function(){return s.a}});var r=n(72972),s=n.n(r)},86134:function(a,e,n){"use strict";n.d(e,{L$:function(){return t}});var r=n(57437),s=n(49751);n(27648),n(2265);let t=a=>{let{type:e,Text:n}=a;return(0,r.jsx)(s.zx,{type:e,className:"w-full shadow-md ".concat("submit"===e?"bg-[#14ae5c] hover:bg-[#267a59]":"bg-red-800 hover:bg-red-600"," font-semibold hover:font-bold"),children:n})}},69291:function(a,e,n){"use strict";n.r(e),n.d(e,{CardAccumulate:function(){return i},CardComponents:function(){return s},CardHeaderContent:function(){return t}});var r=n(57437);n(2265);let s=a=>{let{children:e}=a;return(0,r.jsx)("div",{className:"w-full rounded-md shadow-md p-6 bg-white space-y-2 overflow-hidden",children:e})},t=a=>{let{Header:e,children:n}=a;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"w-full rounded-md shadow-md p-6 bg-white space-y-2",children:[(0,r.jsx)("p",{children:e}),(0,r.jsx)("hr",{}),n]})})},i=a=>{let{Header:e,Count:n,imgurl:s}=a;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"w-full rounded-md shadow-md p-6 bg-white space-y-2",children:(0,r.jsxs)("div",{className:"flex",children:[s&&(0,r.jsx)("img",{src:s,className:"w-8 md:w-10"}),(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("h2",{className:"text-left md:text-4xl text-2xl font-black text-teal-500",children:n}),(0,r.jsx)("h3",{className:"text-neutral-500 text-sm md:text-base",children:e})]})]})})})}},41954:function(a,e,n){"use strict";n.d(e,{qL:function(){return t},qS:function(){return i},ul:function(){return l}});var r=n(57437),s=n(49751);n(2265);let t=a=>{let{label:e,identiti:n,type:t,name:i,placeholder:l,register:u,error:d,disabled:g=!1}=a;return(0,r.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,r.jsx)("label",{htmlFor:n,className:"text-slate-800",children:e}),(0,r.jsx)(s.oi,{id:n,type:t,placeholder:l,...u,disabled:g,className:"form-control form-rounded-xl flex-1"}),d&&(0,r.jsx)("span",{className:"text-red-500 text-sm",children:d.message})]})},i=a=>{let{label:e,identiti:n,options:t,register:i,error:l,placeholder:u,disabled:d=!1}=a;return(0,r.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,r.jsx)("label",{htmlFor:n,className:"text-slate-800",children:e}),(0,r.jsxs)(s.Ph,{id:n,...i,disabled:d,className:"select-rounded",children:[(0,r.jsx)("option",{value:"",disabled:!0,children:u}),t.map(a=>(0,r.jsx)("option",{value:a.value,children:a.title},a.value))]}),l&&(0,r.jsx)("span",{className:"text-red-500 font-semibold",children:l.message})]})},l=a=>{let{label:e,identiti:n,placeholder:s,register:t,error:i,disabled:l=!1,rows:u=4}=a;return(0,r.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,r.jsx)("label",{htmlFor:n,className:"text-slate-800",children:e}),(0,r.jsx)("textarea",{id:n,placeholder:s,...t,disabled:l,rows:u,className:"border border-b-2 rounded-[8px] shadow-md border-slate-600  \n          ".concat(l?"bg-gray-100 text-[#b3b3b3]":"bg-white/50 text-black"," \n          ").concat(i?"border-red-500":"")}),i&&(0,r.jsx)("span",{className:"text-red-500 text-sm",children:i.message})]})}},53514:function(a,e,n){"use strict";n.r(e),n.d(e,{default:function(){return j}});var r=n(57437),s=n(68720),t=n(2265);let i=a=>{let{iconField:e}=a;return(0,r.jsx)(s.JO,{icon:"solar:".concat(e),className:"text-ld dark:text-opacity-60 hide-icon",height:18})};var l=n(29501),u=n(69291),d=n(41954),g=n(86134),c=n(48357),o=n(49089),m=n(65596),p=n(29889),b=()=>{let{data:a}=(0,p.i)("jenis_laporan"),{data:e}=(0,p.i)("jenis_pengawasan"),{data:n}=(0,p.i)("tingkat_resiko"),s=a.map(a=>({value:String(a.id),title:a.jenis_laporan})),i=e.map(a=>({value:String(a.id),title:a.jenis_pengawasan})),b=n.map(a=>({value:a.id,title:a.tingkat_resiko})),{register:h,handleSubmit:x,reset:j,setValue:w,watch:k,formState:{errors:P}}=(0,l.cI)({defaultValues:{JenisPengawasan:"",AreaPengawasan:"",RuangLingkup:"",TujuanSasaran:"",RencanaPenugasan:"",RencanaPenerbitan:"",PenanggungJawab:0,WakilPenanggungJawab:0,Supervisor:0,KetuaTIM:0,ATim:0,Jumlah:0,JumlahLaporan:0,TingkatRisiko:"",JenisLaporan:""},mode:"onBlur"}),{teamMembers:f,addTeamMember:T,removeTeamMember:y,resetTeamMembers:J}=(0,c.A)(),[v,N]=t.useState(""),L=new m.C,S=async a=>{try{let e={area_pengawasan:a.AreaPengawasan,jenis_pengawasan:a.JenisPengawasan,ruang_lingkup:a.RuangLingkup,tujuan_sasaran:a.TujuanSasaran,rencana_penugasan:a.RencanaPenugasan,rencana_penerbitan:a.RencanaPenerbitan,penanggung_jawab:a.PenanggungJawab,wakil_penanggung_jawab:a.WakilPenanggungJawab,pengendali_teknis:a.Supervisor,ketua_tim:a.KetuaTIM,anggota_tim:a.ATim,jumlah:a.Jumlah,tim:f,anggaran:a.Anggaran,jumlah_laporan:"".concat(a.JumlahLaporan," - ").concat(a.JenisLaporan),sarana_prasarana:a.SaranaDanPrasarana,tingkat_risiko:a.TingkatRisiko,keterangan:a.Keterangan,id_user:1,createdAt:new Date,status:"non-pkpt",active:"true"},n=await L.addData("pkpt",e);if(n.success)console.log("NonPKPT berhasil disimpan:",n),j(),J(),alert("Data Non-PKPT berhasil disimpan");else throw Error(n.message)}catch(a){console.error("Error submitting form:",a),alert("Gagal menyimpan data PKPT")}},A=k("PenanggungJawab"),R=k("WakilPenanggungJawab"),q=k("Supervisor"),_=k("KetuaTIM"),M=k("ATim");return t.useEffect(()=>{let a=0;A&&(a+=Number(A)||0),R&&(a+=Number(R)||0),q&&(a+=Number(q)||0),_&&(a+=Number(_)||0),M&&(a+=Number(M)||0),w("Jumlah",a)},[A,R,q,_,M,w]),(0,r.jsxs)("form",{onSubmit:x(S),className:"space-y-4",children:[(0,r.jsxs)(u.CardComponents,{children:[(0,r.jsx)("h3",{children:"Data Non-PKPT"}),(0,r.jsxs)("section",{className:"grid md:grid-cols-2 w-full gap-3",children:[(0,r.jsx)(d.qL,{label:"Area Pengawasan",identiti:"area",type:"text",name:"AreaPengawasan",placeholder:"Masukan Area Pengawasan",register:h("AreaPengawasan",{required:"Area Pengawasan wajib diisi"}),error:P.AreaPengawasan}),(0,r.jsx)(d.qS,{label:"Jenis Pengawasan",identiti:"select-field-pengawasan",options:i,register:h("JenisPengawasan"),placeholder:"Pilih Jenis Pengawasan",error:P.JenisPengawasan,type:"select",name:"JenisPengawasan"}),(0,r.jsx)(d.qL,{label:"Ruang Lingkup",identiti:"rLingkup",type:"text",name:"RuangLingkup",placeholder:"Masukan Ruang Lingkup Pengawasan",register:h("RuangLingkup"),error:P.RuangLingkup}),(0,r.jsx)(d.qL,{label:"Tujuan / Sasaran",identiti:"tSasaran",type:"text",name:"TujuanSasaran",placeholder:"Masukan Tujuan / Sasaran pengawasan",register:h("TujuanSasaran"),error:P.TujuanSasaran})]})]}),(0,r.jsxs)(u.CardComponents,{children:[(0,r.jsx)("h3",{children:"Jadwal Pengawasan"}),(0,r.jsxs)("section",{className:"grid md:grid-cols-2 gap-3",children:[(0,r.jsx)(d.qL,{label:"Rencana Penugasan",identiti:"rPenugasan",type:"date",name:"RencanaPenugasan",placeholder:"Tentukan rencana penugasan",register:h("RencanaPenugasan",{required:"Rencana Penugasan wajib diisi"}),error:P.RencanaPenugasan}),(0,r.jsx)(d.qL,{label:"Rencana Penerbitan",identiti:"rPenerbitan",type:"date",name:"RencanaPenerbitan",placeholder:"Tentukan rencana Penerbitan",register:h("RencanaPenerbitan",{required:"Rencana Penerbitan wajib diisi"}),error:P.RencanaPenerbitan})]})]}),(0,r.jsxs)(u.CardComponents,{children:[(0,r.jsx)("h3",{children:"Hari Penugasan"}),(0,r.jsxs)("section",{className:"grid md:grid-cols-2 gap-3",children:[(0,r.jsx)(d.qL,{label:"Penanggung Jawab",identiti:"penganggungJawab",type:"number",name:"PenanggungJawab",placeholder:"Masukkan jumlah penanggung jawab",register:h("PenanggungJawab",{required:"Penanggung Jawab wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.PenanggungJawab}),(0,r.jsx)(d.qL,{label:"Wakil Penanggung Jawab",identiti:"wPenanggungJawab",type:"number",name:"WakilPenanggungJawab",placeholder:"Masukkan jumlah wakil penanggung jawab",register:h("WakilPenanggungJawab",{required:"Wakil Penanggung Jawab wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.WakilPenanggungJawab}),(0,r.jsx)(d.qL,{label:"Pengendali Teknis/Supervisor",identiti:"pengendaliTeknis",type:"number",name:"Supervisor",placeholder:"Tentukan pengendali teknis",register:h("Supervisor",{required:"Supervisor wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.Supervisor}),(0,r.jsx)(d.qL,{label:"Ketua TIM",identiti:"ketuaTim",type:"number",name:"KetuaTIM",placeholder:"Tentukan ketua tim",register:h("KetuaTIM",{required:"Ketua TIM wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.KetuaTIM}),(0,r.jsx)(d.qL,{label:"AnggotaTIM",identiti:"ATim",type:"number",name:"ATim",placeholder:"Masukan Anggota Tim",register:h("ATim",{required:"Anggota TIM wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.ATim}),(0,r.jsx)(d.qL,{label:"Jumlah",identiti:"Jumlah",type:"number",name:"Jumlah",placeholder:"Total Jumlah",register:h("Jumlah"),error:P.Jumlah,disabled:!0}),(0,r.jsxs)("div",{className:"col-span-2",children:[(0,r.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,r.jsxs)("label",{htmlFor:"Tim",className:"text-slate-800",children:["TIM [",f.length,"]"]}),(0,r.jsxs)("div",{className:"flex gap-2 w-full justify-start flex-grow",children:[(0,r.jsx)("input",{type:"text",value:v,onChange:a=>N(a.target.value),placeholder:"Masukkan nama anggota tim",className:"border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1"}),(0,r.jsx)("button",{onClick:a=>{a.preventDefault(),v.trim()&&(T(v.trim()),N(""))},type:"button",className:"px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary",children:"Tambah"})]})]}),(0,r.jsx)("div",{className:"mt-4 space-y-2 w-full",children:f.map(a=>(0,r.jsxs)("div",{className:"flex items-center justify-between bg-slate-100 p-2 rounded-md",children:[(0,r.jsx)("span",{className:"text-slate-800",children:a.name}),(0,r.jsx)("button",{onClick:()=>y(a.id),type:"button",className:"text-red-500 hover:text-red-700",children:(0,r.jsx)(o.Xm5,{})})]},a.id))})]})]})]}),(0,r.jsx)(u.CardComponents,{children:(0,r.jsxs)("section",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[(0,r.jsx)(d.qL,{label:"Anggaran (Opsional)",identiti:"Anggaran",type:"number",name:"Anggaran",placeholder:"Masukan total anggaran",register:h("Anggaran",{min:{value:0,message:"Anggaran tidak boleh negatif"},validate:a=>!a||Number.isInteger(Number(a))||"Anggaran harus berupa bilangan bulat"}),error:P.Anggaran}),(0,r.jsxs)("div",{className:"flex justify-start items-baseline gap-3 w-full",children:[(0,r.jsx)("div",{className:"flex-1",children:(0,r.jsx)(d.qL,{label:"Jumlah Laporan",identiti:"jLaporan",type:"number",name:"JumlahLaporan",placeholder:"Masukan jumlah laporan",register:h("JumlahLaporan",{required:"Jumlah Laporan wajib diisi",min:{value:1,message:"Minimal 1 laporan"},validate:a=>Number.isInteger(Number(a))||"Jumlah laporan harus berupa bilangan bulat"}),error:P.JumlahLaporan})}),(0,r.jsx)(d.qS,{label:"Jenis Laporan",identiti:"select-field",options:s,register:h("JenisLaporan"),placeholder:"Pilih Jenis Laporan",error:P.JenisLaporan,type:"select",name:"JenisLaporan"})]}),(0,r.jsx)(d.qL,{label:"Sarana dan Prasarana (Opsional)",identiti:"sPrasarana",type:"text",name:"SaranaDanPrasarana",placeholder:"Masukan Sarana dan Prasarana",register:h("SaranaDanPrasarana"),error:P.SaranaDanPrasarana}),(0,r.jsx)(d.qS,{label:"Tingkat Risiko",identiti:"tRisiko",options:b,register:h("TingkatRisiko"),placeholder:"Pilih Tingkat Risiko",error:P.TingkatRisiko,type:"select",name:"TingkatRisiko"}),(0,r.jsx)("div",{className:"md:col-span-2",children:(0,r.jsx)(d.qL,{label:"Keterangan (Opsional)",identiti:"keterangan",type:"text",name:"Keterangan",placeholder:"Masukan keterangan jika diperlukan",register:h("Keterangan"),error:P.Keterangan})})]})}),(0,r.jsx)("section",{className:"flex",children:(0,r.jsx)(g.L$,{Text:"Simpan Data",type:"submit"})})]})},h=()=>{let{data:a}=(0,p.i)("jenis_laporan"),{data:e}=(0,p.i)("jenis_pengawasan"),{data:n}=(0,p.i)("tingkat_resiko"),s=a.map(a=>({value:String(a.id),title:a.jenis_laporan})),i=e.map(a=>({value:String(a.id),title:a.jenis_pengawasan})),b=n.map(a=>({value:a.id,title:a.tingkat_resiko})),{register:h,handleSubmit:x,reset:j,setValue:w,watch:k,formState:{errors:P}}=(0,l.cI)({defaultValues:{JenisPengawasan:"",AreaPengawasan:"",RuangLingkup:"",TujuanSasaran:"",RencanaPenugasan:"",RencanaPenerbitan:"",PenanggungJawab:0,WakilPenanggungJawab:0,Supervisor:0,KetuaTIM:0,ATim:0,Jumlah:0,JumlahLaporan:0,TingkatRisiko:"",JenisLaporan:""},mode:"onBlur"}),{teamMembers:f,addTeamMember:T,removeTeamMember:y,resetTeamMembers:J}=(0,c.A)(),[v,N]=t.useState(""),L=new m.C,S=async a=>{try{let e={area_pengawasan:a.AreaPengawasan,jenis_pengawasan:a.JenisPengawasan,ruang_lingkup:a.RuangLingkup,tujuan_sasaran:a.TujuanSasaran,rencana_penugasan:a.RencanaPenugasan,rencana_penerbitan:a.RencanaPenerbitan,penanggung_jawab:a.PenanggungJawab,wakil_penanggung_jawab:a.WakilPenanggungJawab,pengendali_teknis:a.Supervisor,ketua_tim:a.KetuaTIM,anggota_tim:a.ATim,jumlah:a.Jumlah,tim:f,anggaran:a.Anggaran,jumlah_laporan:"".concat(a.JumlahLaporan," - ").concat(a.JenisLaporan),sarana_prasarana:a.SaranaDanPrasarana,tingkat_risiko:a.TingkatRisiko,keterangan:a.Keterangan,id_user:1,createdAt:new Date,status:"pkpt",active:"true"},n=await L.addData("pkpt",e);if(n.success)console.log("PKPT berhasil disimpan:",n),j(),J(),alert("Data PKPT berhasil disimpan");else throw Error(n.message)}catch(a){console.error("Error submitting form:",a),alert("Gagal menyimpan data PKPT")}},A=k("PenanggungJawab"),R=k("WakilPenanggungJawab"),q=k("Supervisor"),_=k("KetuaTIM"),M=k("ATim");return t.useEffect(()=>{let a=0;A&&(a+=Number(A)||0),R&&(a+=Number(R)||0),q&&(a+=Number(q)||0),_&&(a+=Number(_)||0),M&&(a+=Number(M)||0),w("Jumlah",a)},[A,R,q,_,M,w]),(0,r.jsxs)("form",{onSubmit:x(S),className:"space-y-4",children:[(0,r.jsxs)(u.CardComponents,{children:[(0,r.jsx)("h3",{children:"Data PKPT"}),(0,r.jsxs)("section",{className:"grid md:grid-cols-2 w-full gap-3",children:[(0,r.jsx)(d.qL,{label:"Area Pengawasan",identiti:"area",type:"text",name:"AreaPengawasan",placeholder:"Masukan Area Pengawasan",register:h("AreaPengawasan",{required:"Area Pengawasan wajib diisi"}),error:P.AreaPengawasan}),(0,r.jsx)(d.qS,{label:"Jenis Pengawasan",identiti:"select-field-pengawasan",options:i,register:h("JenisPengawasan"),placeholder:"Pilih Jenis Pengawasan",error:P.JenisPengawasan,type:"select",name:"JenisPengawasan"}),(0,r.jsx)(d.qL,{label:"Ruang Lingkup",identiti:"rLingkup",type:"text",name:"RuangLingkup",placeholder:"Masukan Ruang Lingkup Pengawasan",register:h("RuangLingkup"),error:P.RuangLingkup}),(0,r.jsx)(d.qL,{label:"Tujuan / Sasaran",identiti:"tSasaran",type:"text",name:"TujuanSasaran",placeholder:"Masukan Tujuan / Sasaran pengawasan",register:h("TujuanSasaran"),error:P.TujuanSasaran})]})]}),(0,r.jsxs)(u.CardComponents,{children:[(0,r.jsx)("h3",{children:"Jadwal Pengawasan"}),(0,r.jsxs)("section",{className:"grid md:grid-cols-2 gap-3",children:[(0,r.jsx)(d.qL,{label:"Rencana Penugasan",identiti:"rPenugasan",type:"date",name:"RencanaPenugasan",placeholder:"Tentukan rencana penugasan",register:h("RencanaPenugasan",{required:"Rencana Penugasan wajib diisi"}),error:P.RencanaPenugasan}),(0,r.jsx)(d.qL,{label:"Rencana Penerbitan",identiti:"rPenerbitan",type:"date",name:"RencanaPenerbitan",placeholder:"Tentukan rencana Penerbitan",register:h("RencanaPenerbitan",{required:"Rencana Penerbitan wajib diisi"}),error:P.RencanaPenerbitan})]})]}),(0,r.jsxs)(u.CardComponents,{children:[(0,r.jsx)("h3",{children:"Hari Penugasan"}),(0,r.jsxs)("section",{className:"grid md:grid-cols-2 gap-3",children:[(0,r.jsx)(d.qL,{label:"Penanggung Jawab",identiti:"penganggungJawab",type:"number",name:"PenanggungJawab",placeholder:"Masukkan jumlah penanggung jawab",register:h("PenanggungJawab",{required:"Penanggung Jawab wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.PenanggungJawab}),(0,r.jsx)(d.qL,{label:"Wakil Penanggung Jawab",identiti:"wPenanggungJawab",type:"number",name:"WakilPenanggungJawab",placeholder:"Masukkan jumlah wakil penanggung jawab",register:h("WakilPenanggungJawab",{required:"Wakil Penanggung Jawab wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.WakilPenanggungJawab}),(0,r.jsx)(d.qL,{label:"Pengendali Teknis/Supervisor",identiti:"pengendaliTeknis",type:"number",name:"Supervisor",placeholder:"Tentukan pengendali teknis",register:h("Supervisor",{required:"Supervisor wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.Supervisor}),(0,r.jsx)(d.qL,{label:"Ketua TIM",identiti:"ketuaTim",type:"number",name:"KetuaTIM",placeholder:"Tentukan ketua tim",register:h("KetuaTIM",{required:"Ketua TIM wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.KetuaTIM}),(0,r.jsx)(d.qL,{label:"AnggotaTIM",identiti:"ATim",type:"number",name:"ATim",placeholder:"Masukan Anggota Tim",register:h("ATim",{required:"Anggota TIM wajib diisi",min:{value:0,message:"Tidak boleh negatif"}}),error:P.ATim}),(0,r.jsx)(d.qL,{label:"Jumlah",identiti:"Jumlah",type:"number",name:"Jumlah",placeholder:"Total Jumlah",register:h("Jumlah"),error:P.Jumlah,disabled:!0}),(0,r.jsxs)("div",{className:"col-span-2",children:[(0,r.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,r.jsxs)("label",{htmlFor:"Tim",className:"text-slate-800",children:["TIM [",f.length,"]"]}),(0,r.jsxs)("div",{className:"flex gap-2 w-full justify-start flex-grow",children:[(0,r.jsx)("input",{type:"text",value:v,onChange:a=>N(a.target.value),placeholder:"Masukkan nama anggota tim",className:"border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1"}),(0,r.jsx)("button",{onClick:a=>{a.preventDefault(),v.trim()&&(T(v.trim()),N(""))},type:"button",className:"px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary",children:"Tambah"})]})]}),(0,r.jsx)("div",{className:"mt-4 space-y-2 w-full",children:f.map(a=>(0,r.jsxs)("div",{className:"flex items-center justify-between bg-slate-100 p-2 rounded-md",children:[(0,r.jsx)("span",{className:"text-slate-800",children:a.name}),(0,r.jsx)("button",{onClick:()=>y(a.id),type:"button",className:"text-red-500 hover:text-red-700",children:(0,r.jsx)(o.Xm5,{})})]},a.id))})]})]})]}),(0,r.jsx)(u.CardComponents,{children:(0,r.jsxs)("section",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[(0,r.jsx)(d.qL,{label:"Anggaran (Opsional)",identiti:"Anggaran",type:"number",name:"Anggaran",placeholder:"Masukan total anggaran",register:h("Anggaran",{min:{value:0,message:"Anggaran tidak boleh negatif"},validate:a=>!a||Number.isInteger(Number(a))||"Anggaran harus berupa bilangan bulat"}),error:P.Anggaran}),(0,r.jsxs)("div",{className:"flex justify-start items-baseline gap-3 w-full",children:[(0,r.jsx)("div",{className:"flex-1",children:(0,r.jsx)(d.qL,{label:"Jumlah Laporan",identiti:"jLaporan",type:"number",name:"JumlahLaporan",placeholder:"Masukan jumlah laporan",register:h("JumlahLaporan",{required:"Jumlah Laporan wajib diisi",min:{value:1,message:"Minimal 1 laporan"},validate:a=>Number.isInteger(Number(a))||"Jumlah laporan harus berupa bilangan bulat"}),error:P.JumlahLaporan})}),(0,r.jsx)(d.qS,{label:"Jenis Laporan",identiti:"select-field",options:s,register:h("JenisLaporan"),placeholder:"Pilih Jenis Laporan",error:P.JenisLaporan,type:"select",name:"JenisLaporan"})]}),(0,r.jsx)(d.qL,{label:"Sarana dan Prasarana (Opsional)",identiti:"sPrasarana",type:"text",name:"SaranaDanPrasarana",placeholder:"Masukan Sarana dan Prasarana",register:h("SaranaDanPrasarana"),error:P.SaranaDanPrasarana}),(0,r.jsx)(d.qS,{label:"Tingkat Risiko",identiti:"tRisiko",options:b,register:h("TingkatRisiko"),placeholder:"Pilih Tingkat Risiko",error:P.TingkatRisiko,type:"select",name:"TingkatRisiko"}),(0,r.jsx)("div",{className:"md:col-span-2",children:(0,r.jsx)(d.qL,{label:"Keterangan (Opsional)",identiti:"keterangan",type:"text",name:"Keterangan",placeholder:"Masukan keterangan jika diperlukan",register:h("Keterangan"),error:P.Keterangan})})]})}),(0,r.jsx)("section",{className:"flex",children:(0,r.jsx)(g.L$,{Text:"Simpan Data",type:"submit"})})]})},x=n(6611),j=()=>(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("h1",{className:"text-xl font-semibold",children:[(0,r.jsx)(i,{iconField:"text-field-focus-line-duotone"}),"Input PKPT"]}),(0,r.jsxs)(x.TabGroup,{className:"space-y-4",children:[(0,r.jsxs)(x.TabList,{className:"grid grid-cols-2 w-full gap-3",children:[(0,r.jsx)(x.Tab,{className:"data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold px-4 py-2 rounded-md shadow-md",children:"Data PKPT"}),(0,r.jsx)(x.Tab,{className:"data-[selected]:bg-primary data-[selected]:font-bold data-[selected]:text-white data-[selected]:font-bold data-[hover]:font-semibold px-4 py-2 rounded-md shadow-md",children:"Data Non-PKPT"})]}),(0,r.jsxs)(x.TabPanels,{children:[(0,r.jsx)(x.TabPanel,{children:(0,r.jsx)(h,{})}),(0,r.jsx)(x.TabPanel,{children:(0,r.jsx)(b,{})})]})]})]})},29889:function(a,e,n){"use strict";n.d(e,{i:function(){return t}});var r=n(2265);let s=new(n(16929)).g,t=a=>{let[e,n]=(0,r.useState)([]),[t,i]=(0,r.useState)(!0),[l,u]=(0,r.useState)(null),d=(0,r.useCallback)(async()=>{try{i(!0);let e=await s.getAllData(a);e.success&&Array.isArray(e.data)?(n(e.data),u(null)):u(Error(e.message))}catch(a){u(a)}finally{i(!1)}},[a]);return(0,r.useEffect)(()=>{d()},[d]),{data:e,isLoading:t,error:l,refetch:d}}},48357:function(a,e,n){"use strict";let r;n.d(e,{A:function(){return d}});var s=n(2265);let t=a=>{let e;let n=new Set,r=(a,r)=>{let s="function"==typeof a?a(e):a;if(!Object.is(s,e)){let a=e;e=(null!=r?r:"object"!=typeof s||null===s)?s:Object.assign({},e,s),n.forEach(n=>n(e,a))}},s=()=>e,t={setState:r,getState:s,getInitialState:()=>i,subscribe:a=>(n.add(a),()=>n.delete(a))},i=e=a(r,s,t);return t},i=a=>a?t(a):t,l=a=>a,u=a=>{let e=i(a),n=a=>(function(a,e=l){let n=s.useSyncExternalStore(a.subscribe,()=>e(a.getState()),()=>e(a.getInitialState()));return s.useDebugValue(n),n})(e,a);return Object.assign(n,e),n},d=(r=a=>({teamMembers:[],addTeamMember:e=>a(a=>({teamMembers:[...a.teamMembers,{id:Date.now().toString(),name:e}]})),removeTeamMember:e=>a(a=>({teamMembers:a.teamMembers.filter(a=>a.id!==e)})),resetTeamMembers:()=>a({teamMembers:[]})}))?u(r):u},16929:function(a,e,n){"use strict";n.d(e,{g:function(){return l}});var r=n(83464),s=n(40257);let t="http://simwas.tasikmalayakota.go.id:8080";if(!t)throw Error("NEXT_PUBLIC_API_ENDPOINT is not defined in environment variables.");let i=r.Z.create({baseURL:t,timeout:1e4,headers:{"Content-Type":"application/json"}});i.interceptors.request.use(a=>{let e=s.env.NEXT_SECRET_API_TOKEN;return e&&(a.headers.Authorization="Bearer ".concat(e)),a},a=>Promise.reject(a)),i.interceptors.response.use(a=>a.data,a=>{var e;return Promise.reject((null===(e=a.response)||void 0===e?void 0:e.data)||a.message||"An unknown error occurred")});class l{async getAllData(a){try{let e=await i.get(a);return{success:!0,data:e,message:"Data berhasil diambil"}}catch(a){return{success:!1,error:a,message:"Gagal mengambil data"}}}async addData(a,e){try{let n=await i.post(a,e);return{success:!0,data:n,message:"Data berhasil ditambahkan"}}catch(a){return{success:!1,error:a,message:"Gagal menambahkan data"}}}async updateData(a,e){try{let n=await i.put(a,e);return{success:!0,data:n,message:"Data berhasil diupdate"}}catch(a){return{success:!1,error:a,message:"Gagal mengupdate data"}}}async deleteData(a){try{let e=await i.delete(a);return{success:!0,data:e,message:"Data berhasil dihapus"}}catch(a){return{success:!1,error:a,message:"Gagal menghapus data"}}}async getDataById(a){try{let e=await i.get(a);return{success:!0,data:e.data,message:"Data berhasil diambil"}}catch(a){return{success:!1,error:a,message:"Gagal mengambil data"}}}}},65596:function(a,e,n){"use strict";n.d(e,{C:function(){return l}});var r=n(738),s=n(5978);let t=(0,r.ZF)({apiKey:"AIzaSyDqZ4Ec9UxT19VwkimUfntAG2BGXpB_NgY",authDomain:"simwas-43d36.firebaseapp.com",projectId:"simwas-43d36",storageBucket:"simwas-43d36.firebasestorage.app",messagingSenderId:"347853228552",appId:"1:347853228552:web:85ba82ba8b9cbcf6989fbd",measurementId:"G-S4YKFSE74R"}),i=(0,s.ad)(t);class l{async addData(a,e){try{let n=await (0,s.ET)((0,s.hJ)(i,a),e);return{success:!0,id:n.id,message:"Data berhasil ditambahkan"}}catch(a){return{success:!1,error:a,message:"Gagal menambahkan data"}}}async getAllData(a){try{let e=(await (0,s.PL)((0,s.hJ)(i,a))).docs.map(a=>({id:a.id,...a.data()}));return{success:!0,data:e,message:"Data berhasil diambil"}}catch(a){return{success:!1,error:a,message:"Gagal mengambil data"}}}async updateData(a,e,n){try{let r=(0,s.JU)(i,a,e);return await (0,s.r7)(r,n),{success:!0,message:"Data berhasil diupdate"}}catch(a){return{success:!1,error:a,message:"Gagal mengupdate data"}}}async deleteData(a,e){try{return await (0,s.oe)((0,s.JU)(i,a,e)),{success:!0,message:"Data berhasil dihapus"}}catch(a){return{success:!1,error:a,message:"Gagal menghapus data"}}}async getDataById(a,e){try{let n=(0,s.JU)(i,a,e),r=await (0,s.QT)(n);if(r.exists())return{success:!0,data:{id:r.id,...r.data()}};return{success:!1,message:"Data tidak ditemukan"}}catch(a){return{success:!1,error:a,message:"Gagal mengambil data"}}}async getDataByField(a,e,n,r){try{let t=(0,s.hJ)(i,a),l=(0,s.IO)(t,(0,s.ar)(e,n,r)),u=(await (0,s.PL)(l)).docs.map(a=>({id:a.id,...a.data()}));return{success:!0,data:u,total:u.length}}catch(a){return{success:!1,error:a,message:"Gagal mengambil data"}}}}}},function(a){a.O(0,[716,9375,3972,327,2988,7699,4358,2972,3676,9751,244,5973,3464,9501,4381,6714,6611,2971,2117,1744],function(){return a(a.s=18045)}),_N_E=a.O()}]);