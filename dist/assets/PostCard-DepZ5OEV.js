import{_ as i,l as c,o,d as l,w as d,a as e,c as a,t as s,b as r}from"./index-BacNwaiO.js";const u={name:"PostItem",props:{linkTo:{type:String,required:!0},post:{type:Object,required:!0},showTag:{type:Boolean,required:!0},showDate:{type:Boolean,required:!0}}},_={class:"group"},p={class:"relative w-full overflow-hidden rounded-lg aspect-video dark:border dark:border-white/20"},x={key:0,class:"absolute bottom-4 right-4 z-10 px-1.5 py-1 rounded bg-stone-50 text-stone-600 whitespace-nowrap text-xs font-normal',"},m=["src","alt"],h={key:0,class:"px-2 py-2 text-xs font-normal tracking-widest border-b md:py-3 xl:px-4 border-stone-200 dark:border-stone-500 text-stone-500 dark:text-stone-400"},b={class:"px-2 py-2 text-base font-medium text-justify md:text-sm xl:text-base xl:px-4 line-clamp-3 dark:text-white"};function k(f,g,t,w,y,v){const n=c("RouterLink");return o(),l(n,{to:t.linkTo},{default:d(()=>[e("div",_,[e("div",p,[t.showTag?(o(),a("div",x,s(t.post.category),1)):r("",!0),e("img",{src:t.post.image,alt:t.post.title,class:"object-cover object-center w-full h-full transition-all duration-300 ease-in-out group-hover:scale-110"},null,8,m)]),t.showDate?(o(),a("p",h,s(t.post.date),1)):r("",!0),e("p",b,s(t.post.title),1)])]),_:1},8,["to"])}const j=i(u,[["render",k]]);export{j as _};