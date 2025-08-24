// app/page.tsx  (hoặc src/app/page.tsx nếu dự án dùng src/)
import HeroHome from "@/components/hero-home";
// import PreviewCards from "@/components/PreviewCards";
// import ValueStrip from "@/components/ValueStrip";
// import BottomCTA from "@/components/BottomCTA";

export default function HomePage() {
  return <main className="bg-neutral-950"><HeroHome /></main>;
}


// export default function HomePage() {
//   return (
//     <main className="bg-neutral-950">
//       <HeroHome />
//       <PreviewCards />
//       <ValueStrip />
//       <BottomCTA />
//     </main>
//   );
// }
