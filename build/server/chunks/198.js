exports.id=198,exports.ids=[198],exports.modules={24335:(e,a,s)=>{Promise.resolve().then(s.bind(s,92650))},92650:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>I});var r=s(10326),l=s(17577),i=s.n(l),n=s(81534),t=s(69473),d=s.n(t);let c=[{heading:"Resume",children:[{name:"Dashboard",icon:"solar:home-smile-angle-line-duotone",id:d()(),url:"/dashboard"}]},{heading:"Referensi",children:[{name:"Buat Data Referensi",icon:"solar:shield-plus-line-duotone",id:d()(),url:"/dashboard/datareferensi"}]},{heading:"Perencanaan",children:[{name:"PKPT",icon:"solar:book-minimalistic-line-duotone",id:d()(),url:"/dashboard/perencanaan/pkpt"}]},{heading:"Pelaksanaan",children:[{name:"Surat Tugas",icon:"solar:file-send-line-duotone",id:d()(),url:"/dashboard/perencanaan/surattugas"},{name:"Kendali Mutu",icon:"solar:checklist-minimalistic-line-duotone",id:d()(),url:"/dashboard/pelaksanaan/kendalimutu"},{name:"Nota Hasil",icon:"solar:move-to-folder-line-duotone",id:d()(),url:"/dashboard/pelaksanaan/notahasil"}]},{heading:"Pelaporan",children:[{name:"Lembar Hasil",icon:"solar:folder-check-line-duotone",id:d()(),url:"/dashboard/pelaporan/lembarhasil"},{name:"Hasil Temuan",icon:"solar:presentation-graph-line-duotone",id:d()(),url:"/dashboard/pelaporan/ringkasanpengawasan"}]},{heading:"Tindak Lanjut",children:[{name:"Realisasi PKPT",icon:"solar:book-bookmark-line-duotone",id:d()(),url:"/dashboard/perencanaan/realisasipkpt"}]}];var o=s(44829),h=s(90434),m=s(35047);let x=({item:e})=>{let a=(0,m.usePathname)();return r.jsx(r.Fragment,{children:r.jsx(n.YE.Item,{href:e.url,as:h.default,className:`${e.url==a?"!text-white bg-primary shadow-active":"text-link bg-transparent group/link "} `,children:(0,r.jsxs)("span",{className:"flex gap-3 align-center items-center truncate",children:[e.icon?r.jsx(o.JO,{icon:e.icon,className:`${e.color}`,height:18}):r.jsx("span",{className:`${e.url==a?"dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary !bg-primary h-[6px] w-[6px]":"h-[6px] w-[6px] bg-darklink dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary"} `}),r.jsx("span",{className:"max-w-36 overflow-hidden hide-menu",children:e.name})]})})})};var u=s(38492),p=s(31009);let g=({item:e})=>{let a=(0,m.usePathname)(),s=e.children.find(e=>e.url===a);return r.jsx(r.Fragment,{children:r.jsx(n.YE.Collapse,{label:e.name,open:!!s,icon:()=>r.jsx(o.JO,{icon:e.icon,height:18}),className:`${s?"!text-primary bg-lightprimary ":""} collapse-menu`,renderChevronIcon:(e,a)=>{let s=u.kzR;return r.jsx(s,{"aria-hidden":!0,className:`${(0,p.m6)(e.label.icon.open[a?"on":"off"])} drop-icon`})},children:e.children&&r.jsx(n.YE.ItemGroup,{className:"sidebar-dropdown",children:e.children.map(e=>r.jsx(i().Fragment,{children:e.children?r.jsx(g,{item:e}):r.jsx(x,{item:e})},e.id))})})})};var j=s(12103),f=s(69921);let b=()=>r.jsx(r.Fragment,{children:r.jsx("div",{className:"xl:block hidden",children:r.jsx("div",{className:"flex",children:(0,r.jsxs)(n.YE,{className:"fixed menu-sidebar pt-6 bg-white dark:bg-darkgray z-[10]","aria-label":"Sidebar with multi-level dropdown example",children:[r.jsx("div",{className:"mb-7 px-6 brand-logo",children:r.jsx(f.Z,{})}),r.jsx(j.Z,{className:"h-[calc(100vh_-_120px)]",children:r.jsx(n.YE.Items,{className:"px-6",children:r.jsx(n.YE.ItemGroup,{className:"sidebar-nav",children:c.map((e,a)=>(0,r.jsxs)(i().Fragment,{children:[r.jsx("h5",{className:"text-link text-xs caption",children:r.jsx("span",{className:"hide-menu",children:e.heading})}),r.jsx(o.JO,{icon:"solar:menu-dots-bold",className:"text-ld block mx-auto mt-6 leading-6 dark:text-opacity-60 hide-icon",height:18}),e.children?.map((e,a)=>r.jsx(i().Fragment,{children:e.children?r.jsx("div",{className:"collpase-items",children:r.jsx(g,{item:e})}):r.jsx(x,{item:e})},e.id&&a))]},a))})})})]})})})});var v=s(46226);let N=()=>r.jsx("div",{className:"relative group/menu",children:(0,r.jsxs)(n.Lt,{label:"",className:"rounded-sm w-44",dismissOnClick:!1,renderTrigger:()=>r.jsx("span",{className:"h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary",children:r.jsx(v.default,{src:"/images/profile/user-1.jpg",alt:"logo",height:"35",width:"35",className:"rounded-full"})}),children:[(0,r.jsxs)(n.Lt.Item,{as:h.default,href:"#",className:"px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark",children:[r.jsx(o.JO,{icon:"solar:user-circle-outline",height:20}),"My Profile"]}),(0,r.jsxs)(n.Lt.Item,{as:h.default,href:"#",className:"px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark",children:[r.jsx(o.JO,{icon:"solar:letter-linear",height:20}),"My Account"]}),(0,r.jsxs)(n.Lt.Item,{as:h.default,href:"#",className:"px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark",children:[r.jsx(o.JO,{icon:"solar:checklist-linear",height:20}),"My Task"]}),r.jsx("div",{className:"p-3 pt-0",children:r.jsx(n.zx,{as:h.default,size:"sm",href:"/auth/login",className:"mt-2 border border-primary text-primary bg-transparent hover:bg-lightprimary outline-none focus:outline-none",children:"Logout"})})]})}),k=()=>r.jsx("div",{className:"relative group/menu",children:(0,r.jsxs)(n.Lt,{label:"",className:"rounded-sm w-44 notification",dismissOnClick:!1,renderTrigger:()=>(0,r.jsxs)("span",{className:"h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer relative","aria-label":"Notifications",children:[r.jsx(o.JO,{icon:"solar:bell-linear",height:20}),r.jsx(n.Ct,{className:"h-2 w-2 rounded-full absolute end-2 top-1 bg-primary p-0"})]}),children:[r.jsx(n.Lt.Item,{as:h.default,href:"#",className:"px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark hover:bg-gray-100",children:(0,r.jsxs)("div",{className:"flex items-center gap-5",children:[r.jsx("div",{children:r.jsx(v.default,{src:"/images/profile/user-1.jpg",alt:"user",width:35,height:35,className:"rounded-full"})}),r.jsx("p",{className:"text-black text-sm font-semibold",children:"Received Order from John Doe of $385.90"})]})}),r.jsx(n.Lt.Item,{as:h.default,href:"#",className:"px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark hover:bg-gray-100",children:(0,r.jsxs)("div",{className:"flex items-center gap-5",children:[r.jsx("div",{children:r.jsx(v.default,{src:"/images/profile/user-2.jpg",alt:"user",width:35,height:35,className:"rounded-full"})}),r.jsx("p",{className:"text-black text-sm font-semibold",children:"Received Order from Jessica Williams of $249.99"})]})}),r.jsx(n.Lt.Item,{as:h.default,href:"#",className:"px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark hover:bg-gray-100",children:(0,r.jsxs)("div",{className:"flex items-center gap-5",children:[r.jsx("div",{children:r.jsx(v.default,{src:"/images/profile/user-3.jpg",alt:"user",width:35,height:35,className:"rounded-full"})}),r.jsx("p",{className:"text-black text-sm font-semibold",children:"Received Order from John Edison of $499.99"})]})}),r.jsx(n.Lt.Item,{as:h.default,href:"#",className:"px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark hover:bg-gray-100",children:(0,r.jsxs)("div",{className:"flex items-center gap-5",children:[r.jsx("div",{children:r.jsx(v.default,{src:"/images/profile/user-4.jpg",alt:"user",width:35,height:35,className:"rounded-full"})}),r.jsx("p",{className:"text-black text-sm font-semibold",children:"Received message from Nitin Chohan"})]})}),r.jsx("div",{className:""})]})}),w=()=>r.jsx(r.Fragment,{children:r.jsx("div",{className:"flex",children:(0,r.jsxs)(n.YE,{className:"fixed menu-sidebar pt-6 bg-white dark:bg-darkgray z-[10]","aria-label":"Sidebar with multi-level dropdown example",children:[r.jsx("div",{className:"mb-7 px-4 brand-logo",children:r.jsx(f.Z,{})}),r.jsx(j.Z,{className:"h-[calc(100vh_-_100px)]",children:r.jsx(n.YE.Items,{className:"px-4",children:r.jsx(n.YE.ItemGroup,{className:"sidebar-nav",children:c.map((e,a)=>(0,r.jsxs)(i().Fragment,{children:[r.jsx("h5",{className:"text-link text-xs caption",children:r.jsx("span",{className:"hide-menu",children:e.heading})}),r.jsx(o.JO,{icon:"solar:menu-dots-bold",className:"text-ld block mx-auto mt-6 leading-6 dark:text-opacity-60 hide-icon",height:18}),e.children?.map((e,a)=>r.jsx(i().Fragment,{children:e.children?r.jsx("div",{className:"collpase-items",children:r.jsx(g,{item:e})}):r.jsx(x,{item:e})},e.id&&a))]},a))})})})]})})}),y=()=>{let[e,a]=(0,l.useState)(!1);(0,l.useEffect)(()=>{let e=()=>{window.scrollY>50?a(!0):a(!1)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}},[]);let[s,i]=(0,l.useState)(!1);return(0,r.jsxs)(r.Fragment,{children:[r.jsx("header",{className:`sticky top-0 z-[5] ${e?"bg-white dark:bg-dark fixed w-full":"bg-white"}`,children:r.jsx(n.wp,{fluid:!0,className:"rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4",children:(0,r.jsxs)("div",{className:"flex gap-3 items-center justify-between w-full ",children:[(0,r.jsxs)("div",{className:"flex gap-2 items-center",children:[r.jsx("span",{onClick:()=>i(!0),className:"h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer",children:r.jsx(o.JO,{icon:"solar:hamburger-menu-line-duotone",height:21})}),r.jsx(k,{})]}),r.jsx("div",{className:"flex gap-4 items-center",children:r.jsx(N,{})})]})})}),r.jsx(n.dy,{open:s,onClose:()=>i(!1),className:"w-130",children:r.jsx(n.dy.Items,{children:r.jsx(w,{})})})]})};function I({children:e}){return r.jsx("div",{className:"flex w-full min-h-screen",children:(0,r.jsxs)("div",{className:"page-wrapper flex w-full",children:[r.jsx(b,{}),(0,r.jsxs)("div",{className:"body-wrapper w-full bg-white dark:bg-dark",children:[r.jsx(y,{}),r.jsx("div",{className:"bg-lightgray mr-3 rounded-page min-h-[90vh]",children:r.jsx("div",{className:"container mx-auto  py-30",children:e})})]})]})})}},69921:(e,a,s)=>{"use strict";s.d(a,{Z:()=>i});var r=s(10326);s(17577);var l=s(90434);let i=()=>(0,r.jsxs)(l.default,{href:"/",children:[r.jsx("h1",{className:"text-2xl italic block dark:hidden",children:"Simwas"}),r.jsx("h1",{className:"text-2xl italic hidden dark:block",children:"Simwas"})]})},22834:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>r});let r=(0,s(68570).createProxy)(String.raw`/home/rikza/Documents/DEV/simwasv2/src/app/dashboard/layout.tsx#default`)}};