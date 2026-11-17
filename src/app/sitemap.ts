import type{MetadataRoute}from"next";
const base="https://mentorlagbe.vercel.app";
export default function sitemap():MetadataRoute.Sitemap{return[{url:base,lastModified:new Date(),changeFrequency:"weekly",priority:1},{url:`${base}/tuitions`,lastModified:new Date(),changeFrequency:"daily",priority:.9},{url:`${base}/pricing`,lastModified:new Date(),changeFrequency:"monthly",priority:.7},{url:`${base}/sign-up`,lastModified:new Date(),changeFrequency:"monthly",priority:.5},{url:`${base}/sign-in`,lastModified:new Date(),changeFrequency:"monthly",priority:.4}]}
