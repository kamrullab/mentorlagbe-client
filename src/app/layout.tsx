import type{Metadata,Viewport}from"next";
import{Providers}from"@/components/providers";
import{Navbar}from"@/components/navbar";
import{Footer}from"@/components/footer";
import"./globals.css";
import"./production.css";
import"./responsive-fixes.css";

const siteUrl="https://mentorlagbe.vercel.app";
const socialImage={url:"/mentorlagbe-og.jpg",width:1200,height:630,alt:"A MentorLagbe tutor guiding a student in a modern learning space"};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:5,themeColor:[{media:"(prefers-color-scheme: light)",color:"#f7f5ef"},{media:"(prefers-color-scheme: dark)",color:"#0c1716"}],colorScheme:"light dark"};
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"MentorLagbe | Find Trusted Tutors and Mentors",template:"%s | MentorLagbe"},description:"Find trusted online and home tutors, personalized mentorship batches, and academic guidance across Bangladesh with MentorLagbe.",applicationName:"MentorLagbe",keywords:["tutor Bangladesh","home tuition","online tutor","mentorship","tuition platform","student tutor marketplace","MentorLagbe"],authors:[{name:"MentorLagbe",url:siteUrl}],creator:"MentorLagbe",publisher:"MentorLagbe",category:"education",alternates:{canonical:"/"},openGraph:{type:"website",locale:"en_BD",url:siteUrl,siteName:"MentorLagbe",title:"MentorLagbe | Find the Mentor Who Makes It Click",description:"Discover trusted tutors and personalized mentorship for school, university, languages, and career skills.",images:[socialImage]},twitter:{card:"summary_large_image",title:"MentorLagbe | Smart Tuition and Mentorship",description:"Find trusted tutors and personalized mentorship opportunities across Bangladesh.",images:[socialImage.url]},robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},manifest:"/manifest.webmanifest",icons:{icon:[{url:"/icon.svg",type:"image/svg+xml"}],shortcut:"/icon.svg"}};
const structuredData={"@context":"https://schema.org","@type":"WebSite",name:"MentorLagbe",url:siteUrl,description:"Smart tuition and mentorship platform connecting students with trusted tutors.",inLanguage:"en-BD",potentialAction:{"@type":"SearchAction",target:`${siteUrl}/tuitions?search={search_term_string}`,"query-input":"required name=search_term_string"}};
export default function RootLayout({children}:LayoutProps<"/">){return <html lang="en" suppressHydrationWarning><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/><Providers><Navbar/><main id="main-content">{children}</main><Footer/></Providers></body></html>}
