(()=>{var e={};e.id=878,e.ids=[878],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},35240:e=>{"use strict";e.exports=require("https")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},82452:e=>{"use strict";e.exports=require("tls")},74175:e=>{"use strict";e.exports=require("tty")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},18020:(e,a,s)=>{"use strict";s.r(a),s.d(a,{GlobalError:()=>i.a,__next_app__:()=>g,originalPathname:()=>o,pages:()=>u,routeModule:()=>m,tree:()=>c}),s(42810),s(22834),s(65337),s(12523);var t=s(23191),r=s(88716),n=s(37922),i=s.n(n),l=s(95231),d={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>l[e]);s.d(a,d);let c=["",{children:["dashboard",{children:["perencanaan",{children:["pkpt",{children:["actions",{children:["[id_pkpt]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,42810)),"/home/rikza/Documents/DEV/simwasv2/src/app/dashboard/perencanaan/pkpt/actions/[id_pkpt]/page.tsx"]}]},{}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,22834)),"/home/rikza/Documents/DEV/simwasv2/src/app/dashboard/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,65337)),"/home/rikza/Documents/DEV/simwasv2/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.bind(s,12523)),"/home/rikza/Documents/DEV/simwasv2/src/app/not-found.tsx"]}],u=["/home/rikza/Documents/DEV/simwasv2/src/app/dashboard/perencanaan/pkpt/actions/[id_pkpt]/page.tsx"],o="/dashboard/perencanaan/pkpt/actions/[id_pkpt]/page",g={require:s,loadChunk:()=>Promise.resolve()},m=new t.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/dashboard/perencanaan/pkpt/actions/[id_pkpt]/page",pathname:"/dashboard/perencanaan/pkpt/actions/[id_pkpt]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},38433:(e,a,s)=>{Promise.resolve().then(s.bind(s,65915))},84723:(e,a,s)=>{"use strict";s.r(a),s.d(a,{CardAccumulate:()=>i,CardComponents:()=>r,CardHeaderContent:()=>n});var t=s(10326);s(17577);let r=({children:e})=>t.jsx("div",{className:"w-full rounded-md shadow-md p-6 bg-white space-y-2 overflow-hidden",children:e}),n=({Header:e,children:a})=>t.jsx(t.Fragment,{children:(0,t.jsxs)("div",{className:"w-full rounded-md shadow-md p-6 bg-white space-y-2",children:[t.jsx("p",{children:e}),t.jsx("hr",{}),a]})}),i=({Header:e,Count:a,imgurl:s})=>t.jsx(t.Fragment,{children:t.jsx("div",{className:"w-full rounded-md shadow-md p-6 bg-white space-y-2",children:(0,t.jsxs)("div",{className:"flex",children:[s&&t.jsx("img",{src:s,className:"w-8 md:w-10"}),(0,t.jsxs)("div",{className:"p-4",children:[t.jsx("h2",{className:"text-left md:text-4xl text-2xl font-black text-teal-500",children:a}),t.jsx("h3",{className:"text-neutral-500 text-sm md:text-base",children:e})]})]})})})},47184:(e,a,s)=>{"use strict";s.d(a,{qL:()=>n,qS:()=>i,ul:()=>l});var t=s(10326),r=s(81534);s(17577);let n=({label:e,identiti:a,type:s,name:n,placeholder:i,register:l,error:d,disabled:c=!1})=>(0,t.jsxs)("div",{className:"flex flex-col space-y-2",children:[t.jsx("label",{htmlFor:a,className:"text-slate-800",children:e}),t.jsx(r.oi,{id:a,type:s,placeholder:i,...l,disabled:c,className:"form-control form-rounded-xl flex-1"}),d&&t.jsx("span",{className:"text-red-500 text-sm",children:d.message})]}),i=({label:e,identiti:a,options:s,register:n,error:i,placeholder:l,disabled:d=!1})=>(0,t.jsxs)("div",{className:"flex flex-col space-y-2",children:[t.jsx("label",{htmlFor:a,className:"text-slate-800",children:e}),(0,t.jsxs)(r.Ph,{id:a,...n,disabled:d,className:"select-rounded",children:[t.jsx("option",{value:"",disabled:!0,children:l}),s.map(e=>t.jsx("option",{value:e.value,children:e.title},e.value))]}),i&&t.jsx("span",{className:"text-red-500 font-semibold",children:i.message})]}),l=({label:e,identiti:a,placeholder:s,register:r,error:n,disabled:i=!1,rows:l=4})=>(0,t.jsxs)("div",{className:"flex flex-col space-y-2",children:[t.jsx("label",{htmlFor:a,className:"text-slate-800",children:e}),t.jsx("textarea",{id:a,placeholder:s,...r,disabled:i,rows:l,className:`border border-b-2 rounded-[8px] shadow-md border-slate-600  
          ${i?"bg-gray-100 text-[#b3b3b3]":"bg-white/50 text-black"} 
          ${n?"border-red-500":""}`}),n&&t.jsx("span",{className:"text-red-500 text-sm",children:n.message})]})},65915:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>g});var t=s(10326),r=s(17577),n=s(74723),i=s(84723),l=s(47184),d=s(59204),c=s(44046),u=s(75974);let o=new(s(48420)).C,g=({params:e})=>{let[a,s]=(0,r.useState)(!1),g=e.id_pkpt,[m,p]=(0,r.useState)(""),{teamMembers:h,addTeamMember:b,removeTeamMember:x,resetTeamMembers:j}=(0,d.A)(),{data:k,isLoading:w,error:y}=(0,u.f)("pkpt",g),{register:P,handleSubmit:f,reset:v,watch:N,setValue:_}=(0,n.cI)(),T=N("PenanggungJawab"),L=N("WakilPenanggungJawab"),q=N("Supervisor"),D=N("KetuaTIM"),J=N("ATim"),S=[{value:"LHP",title:"LHP"},{value:"LHA",title:"LHA"},{value:"LHM",title:"LHM"},{value:"LHE",title:"LHE"},{value:"LHR",title:"LHR"}];if((0,r.useEffect)(()=>{let e=0;T&&(e+=Number(T)||0),L&&(e+=Number(L)||0),q&&(e+=Number(q)||0),D&&(e+=Number(D)||0),J&&(e+=Number(J)||0),_("Jumlah",e)},[T,L,q,D,J,_]),(0,r.useEffect)(()=>{if(k){let[e,a]=k.jumlah_laporan.split(" - ");v({JenisPengawasan:k.jenis_pengawasan,AreaPengawasan:k.area_pengawasan,RuangLingkup:k.ruang_lingkup,TujuanSasaran:k.tujuan_sasaran,RencanaPenugasan:k.rencana_penugasan,RencanaPenerbitan:k.rencana_penerbitan,PenanggungJawab:k.penanggung_jawab,WakilPenanggungJawab:k.wakil_penanggung_jawab,Supervisor:k.pengendali_teknis,KetuaTIM:k.ketua_tim,ATim:k.anggota_tim,Jumlah:k.jumlah,Tim:k.tim,Anggaran:k.anggaran,JumlahLaporan:e,JenisLaporan:a,SaranaDanPrasarana:k.sarana_prasarana||"",TingkatRisiko:k.tingkat_risiko,Keterangan:k.keterangan}),j(),k.tim?.forEach(e=>{b(e.name)})}},[k,v,j,b]),w)return t.jsx("div",{children:"Loading..."});if(y)return(0,t.jsxs)("div",{children:["Error: ",y.message]});let A=async e=>{try{let a={jenis_pengawasan:e.JenisPengawasan,area_pengawasan:e.AreaPengawasan,ruang_lingkup:e.RuangLingkup,tujuan_sasaran:e.TujuanSasaran,rencana_penugasan:e.RencanaPenugasan,rencana_penerbitan:e.RencanaPenerbitan,penanggung_jawab:Number(e.PenanggungJawab),wakil_penanggung_jawab:Number(e.WakilPenanggungJawab),pengendali_teknis:Number(e.Supervisor),ketua_tim:Number(e.KetuaTIM),anggota_tim:Number(e.ATim),jumlah:Number(e.Jumlah),tim:h,anggaran:e.Anggaran?Number(e.Anggaran):null,jumlah_laporan:`${e.JumlahLaporan} - ${e.JenisLaporan}`,sarana_prasarana:e.SaranaDanPrasarana||"",tingkat_risiko:e.TingkatRisiko,keterangan:e.Keterangan||null,id_user:k?k.id_user:"noSet",createdAt:k?k.createdAt:"noSet",status:k?k.status:"noSet",active:k?k.active:"noSet"},t=await o.updateData("pkpt",g,a);if(t.success)s(!1),alert("Data berhasil diperbarui"),window.location.reload();else throw Error(t.message)}catch(e){console.error("Error updating PKPT:",e),alert("Gagal memperbarui data PKPT")}},E=async()=>{if(window.confirm("Apakah Anda yakin ingin menghapus PKPT ini?"))try{let e=await o.deleteData("pkpt",g);if(e.success)alert("PKPT berhasil dihapus"),window.location.href="/dashboard/perencanaan/pkpt";else throw Error(e.message)}catch(e){console.error("Error deleting PKPT:",e),alert("Gagal menghapus PKPT")}},M=(0,t.jsxs)("div",{className:"col-span-2",children:[(0,t.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,t.jsxs)("label",{htmlFor:"Tim",className:"text-slate-800",children:["TIM [",h.length,"]"]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[t.jsx("input",{type:"text",value:m,onChange:e=>p(e.target.value),placeholder:"Masukkan nama anggota tim",className:"border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1",disabled:!a}),t.jsx("button",{onClick:e=>{e.preventDefault(),m.trim()&&(b(m.trim()),p(""))},type:"button",className:"px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary disabled:bg-gray-400",disabled:!a,children:"Tambah"})]})]}),t.jsx("div",{className:"mt-4 space-y-2",children:h.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between bg-slate-100 p-2 rounded-md",children:[t.jsx("span",{className:"text-slate-800",children:e.name}),a&&t.jsx("button",{onClick:()=>x(e.id),type:"button",className:"text-red-500 hover:text-red-700",children:t.jsx(c.Xm5,{})})]},e.id))})]});return(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("section",{className:"flex justify-between items-center",children:[(0,t.jsxs)("h3",{children:["Lihat PKPT (",g,")"]}),(0,t.jsxs)("div",{className:"space-x-3",children:[t.jsx("button",{onClick:E,className:"py-1 px-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600",children:"Hapus"}),a?t.jsx("button",{onClick:f(A),className:"py-1 px-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600",children:"Simpan"}):t.jsx("button",{onClick:()=>s(!0),className:"py-1 px-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600",children:"Edit"})]})]}),(0,t.jsxs)("form",{onSubmit:f(A),className:"space-y-3",children:[t.jsx(i.CardComponents,{children:(0,t.jsxs)("section",{className:"grid md:grid-cols-2 w-full gap-3",children:[t.jsx(l.qS,{label:"Jenis Pengawasan",identiti:"select-field-pengawasan",options:S,register:P("JenisPengawasan"),placeholder:"Pilih Jenis Pengawasan",disabled:!a,type:"select",name:"JenisPengawasan"}),t.jsx(l.qL,{label:"Area Pengawasan",identiti:"area",type:"text",name:"AreaPengawasan",placeholder:"Masukan Area Pengawasan",register:P("AreaPengawasan"),disabled:!a}),t.jsx(l.qL,{label:"Ruang Lingkup",identiti:"rLingkup",type:"text",name:"RuangLingkup",placeholder:"Masukan Ruang Lingkup Pengawasan",register:P("RuangLingkup"),disabled:!a}),t.jsx(l.qL,{label:"Tujuan / Sasaran",identiti:"tSasaran",type:"text",name:"TujuanSasaran",placeholder:"Masukan Tujuan / Sasaran pengawasan",register:P("TujuanSasaran"),disabled:!a})]})}),(0,t.jsxs)(i.CardComponents,{children:[t.jsx("h3",{children:"Jadwal Pengawasan"}),(0,t.jsxs)("section",{className:"grid md:grid-cols-2 gap-3",children:[t.jsx(l.qL,{label:"Rencana Penugasan",identiti:"rPenugasan",type:"date",name:"RencanaPenugasan",placeholder:"Tentukan rencana penugasan",register:P("RencanaPenugasan"),disabled:!a}),t.jsx(l.qL,{label:"Rencana Penerbitan",identiti:"rPenerbitan",type:"date",name:"RencanaPenerbitan",placeholder:"Tentukan rencana Penerbitan",register:P("RencanaPenerbitan"),disabled:!a})]})]}),(0,t.jsxs)(i.CardComponents,{children:[t.jsx("h3",{children:"Hari Penugasan"}),(0,t.jsxs)("section",{className:"grid md:grid-cols-2 gap-3",children:[t.jsx(l.qL,{label:"Penanggung Jawab",identiti:"penganggungJawab",type:"number",name:"PenanggungJawab",placeholder:"Masukkan jumlah penanggung jawab",register:P("PenanggungJawab"),disabled:!a}),t.jsx(l.qL,{label:"Wakil Penanggung Jawab",identiti:"wPenanggungJawab",type:"number",name:"WakilPenanggungJawab",placeholder:"Masukkan jumlah wakil penanggung jawab",register:P("WakilPenanggungJawab"),disabled:!a}),t.jsx(l.qL,{label:"Pengendali Teknis/Supervisor",identiti:"pengendaliTeknis",type:"number",name:"Supervisor",placeholder:"Tentukan jumlah pengendali teknis",register:P("Supervisor"),disabled:!a}),t.jsx(l.qL,{label:"Ketua TIM",identiti:"ketuaTim",type:"number",name:"KetuaTIM",placeholder:"Tentukan jumlah ketua tim",register:P("KetuaTIM"),disabled:!a}),t.jsx(l.qL,{label:"AnggotaTIM",identiti:"ATim",type:"number",name:"ATim",placeholder:"Masukan jumlah Anggota Tim",register:P("ATim"),disabled:!a}),t.jsx(l.qL,{label:"Jumlah",identiti:"Jumlah",type:"number",name:"Jumlah",placeholder:"Jumlah TIM",register:P("Jumlah"),disabled:!0}),M]})]}),t.jsx(i.CardComponents,{children:(0,t.jsxs)("section",{className:"md:grid md:grid-cols-2 gap-3",children:[t.jsx(l.qL,{label:"Anggaran (Opsional)",identiti:"Anggaran",type:"number",name:"Anggaran",placeholder:"Masukan total anggaran",register:P("Anggaran"),disabled:!a}),(0,t.jsxs)("div",{className:"flex justify-start items-baseline gap-3",children:[t.jsx("div",{className:"flex-1",children:t.jsx(l.qL,{label:"Jumlah Laporan",identiti:"jLaporan",type:"number",name:"JumlahLaporan",placeholder:"Masukan jumlah laporan",register:P("JumlahLaporan"),disabled:!a})}),t.jsx(l.qS,{label:"Jenis Laporan",identiti:"select-field",options:S,register:P("JenisLaporan"),placeholder:"Pilih Jenis Laporan",disabled:!a,type:"select",name:"JenisLaporan"})]}),t.jsx(l.qL,{label:"Sarana dan Prasarana (Opsional)",identiti:"sPrasarana",type:"text",name:"SaranaDanPrasarana",placeholder:"Masukan Sarana dan Prasarana",register:P("SaranaDanPrasarana"),disabled:!a}),t.jsx(l.qL,{label:"Tingkat Risiko",identiti:"tRisiko",type:"text",name:"TingkatRisiko",placeholder:"Tentukan tingkat risiko",register:P("TingkatRisiko"),disabled:!a}),t.jsx("div",{className:"md:col-span-2",children:t.jsx(l.qL,{label:"Keterangan (Opsional)",identiti:"keterangan",type:"text",name:"Keterangan",placeholder:"Masukan keterangan jika diperlukan",register:P("Keterangan"),disabled:!a})})]})})]})]})}},75974:(e,a,s)=>{"use strict";s.d(a,{f:()=>l});var t=s(17577),r=s(48420),n=s(51447);new r.C;let i=new n.g,l=(e,a)=>{let[s,r]=(0,t.useState)(null),[n,l]=(0,t.useState)(!0),[d,c]=(0,t.useState)(null),u=(0,t.useCallback)(async()=>{try{l(!0);let s=await i.getDataById(`${e}/${a}`);s.success&&Array.isArray(s.data)?(r(s.data),c(null)):c(Error(s.message))}catch(e){c(e)}finally{l(!1)}},[e,a]);return(0,t.useEffect)(()=>{u()},[u]),{data:s,isLoading:n,error:d,refetch:u}}},59204:(e,a,s)=>{"use strict";let t;s.d(a,{A:()=>c});var r=s(17577);let n=e=>{let a;let s=new Set,t=(e,t)=>{let r="function"==typeof e?e(a):e;if(!Object.is(r,a)){let e=a;a=(null!=t?t:"object"!=typeof r||null===r)?r:Object.assign({},a,r),s.forEach(s=>s(a,e))}},r=()=>a,n={setState:t,getState:r,getInitialState:()=>i,subscribe:e=>(s.add(e),()=>s.delete(e))},i=a=e(t,r,n);return n},i=e=>e?n(e):n,l=e=>e,d=e=>{let a=i(e),s=e=>(function(e,a=l){let s=r.useSyncExternalStore(e.subscribe,()=>a(e.getState()),()=>a(e.getInitialState()));return r.useDebugValue(s),s})(a,e);return Object.assign(s,a),s},c=(t=e=>({teamMembers:[],addTeamMember:a=>e(e=>({teamMembers:[...e.teamMembers,{id:Date.now().toString(),name:a}]})),removeTeamMember:a=>e(e=>({teamMembers:e.teamMembers.filter(e=>e.id!==a)})),resetTeamMembers:()=>e({teamMembers:[]})}))?d(t):d},51447:(e,a,s)=>{"use strict";s.d(a,{g:()=>i});var t=s(44099);let r="http://simwas.tasikmalayakota.go.id:8080";if(!r)throw Error("NEXT_PUBLIC_API_ENDPOINT is not defined in environment variables.");let n=t.Z.create({baseURL:r,timeout:1e4,headers:{"Content-Type":"application/json"}});n.interceptors.request.use(e=>{let a=process.env.NEXT_SECRET_API_TOKEN;return a&&(e.headers.Authorization=`Bearer ${a}`),e},e=>Promise.reject(e)),n.interceptors.response.use(e=>e.data,e=>Promise.reject(e.response?.data||e.message||"An unknown error occurred"));class i{async getAllData(e){try{let a=await n.get(e);return{success:!0,data:a,message:"Data berhasil diambil"}}catch(e){return{success:!1,error:e,message:"Gagal mengambil data"}}}async addData(e,a){try{let s=await n.post(e,a);return{success:!0,data:s,message:"Data berhasil ditambahkan"}}catch(e){return{success:!1,error:e,message:"Gagal menambahkan data"}}}async updateData(e,a){try{let s=await n.put(e,a);return{success:!0,data:s,message:"Data berhasil diupdate"}}catch(e){return{success:!1,error:e,message:"Gagal mengupdate data"}}}async deleteData(e){try{let a=await n.delete(e);return{success:!0,data:a,message:"Data berhasil dihapus"}}catch(e){return{success:!1,error:e,message:"Gagal menghapus data"}}}async getDataById(e){try{let a=await n.get(e);return{success:!0,data:a.data,message:"Data berhasil diambil"}}catch(e){return{success:!1,error:e,message:"Gagal mengambil data"}}}}},48420:(e,a,s)=>{"use strict";s.d(a,{C:()=>l});var t=s(42585),r=s(76);let n=(0,t.ZF)({apiKey:"AIzaSyDqZ4Ec9UxT19VwkimUfntAG2BGXpB_NgY",authDomain:"simwas-43d36.firebaseapp.com",projectId:"simwas-43d36",storageBucket:"simwas-43d36.firebasestorage.app",messagingSenderId:"347853228552",appId:"1:347853228552:web:85ba82ba8b9cbcf6989fbd",measurementId:"G-S4YKFSE74R"}),i=(0,r.ad)(n);class l{async addData(e,a){try{let s=await (0,r.ET)((0,r.hJ)(i,e),a);return{success:!0,id:s.id,message:"Data berhasil ditambahkan"}}catch(e){return{success:!1,error:e,message:"Gagal menambahkan data"}}}async getAllData(e){try{let a=(await (0,r.PL)((0,r.hJ)(i,e))).docs.map(e=>({id:e.id,...e.data()}));return{success:!0,data:a,message:"Data berhasil diambil"}}catch(e){return{success:!1,error:e,message:"Gagal mengambil data"}}}async updateData(e,a,s){try{let t=(0,r.JU)(i,e,a);return await (0,r.r7)(t,s),{success:!0,message:"Data berhasil diupdate"}}catch(e){return{success:!1,error:e,message:"Gagal mengupdate data"}}}async deleteData(e,a){try{return await (0,r.oe)((0,r.JU)(i,e,a)),{success:!0,message:"Data berhasil dihapus"}}catch(e){return{success:!1,error:e,message:"Gagal menghapus data"}}}async getDataById(e,a){try{let s=(0,r.JU)(i,e,a),t=await (0,r.QT)(s);if(t.exists())return{success:!0,data:{id:t.id,...t.data()}};return{success:!1,message:"Data tidak ditemukan"}}catch(e){return{success:!1,error:e,message:"Gagal mengambil data"}}}async getDataByField(e,a,s,t){try{let n=(0,r.hJ)(i,e),l=(0,r.IO)(n,(0,r.ar)(a,s,t)),d=(await (0,r.PL)(l)).docs.map(e=>({id:e.id,...e.data()}));return{success:!0,data:d,total:d.length}}catch(e){return{success:!1,error:e,message:"Gagal mengambil data"}}}}},42810:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>t});let t=(0,s(68570).createProxy)(String.raw`/home/rikza/Documents/DEV/simwasv2/src/app/dashboard/perencanaan/pkpt/actions/[id_pkpt]/page.tsx#default`)}};var a=require("../../../../../../webpack-runtime.js");a.C(e);var s=e=>a(a.s=e),t=a.X(0,[705,44,182,46,838,99,723,599,198],()=>s(18020));module.exports=t})();