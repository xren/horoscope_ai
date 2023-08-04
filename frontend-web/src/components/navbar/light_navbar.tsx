import Link from 'next/link'; // Import this at the top

export function LightNavbar() {
  return (
    <div className="fixed flex flex-col left-0 right-0 top-0 h-14 px-4 py-4 align-middle z-homenav">
      <div className="font-extrabold flex justify-start text-transparent text-lg bg-clip-text">
        <Link href="/"> {/* Wrap your logo with a Link tag */}
          <img src="/logo.png" className="h-6 sm:h-7 cursor-pointer" /> {/* Make sure to add cursor-pointer class to make it obvious this is clickable */}
        </Link>
      </div>
    </div>
  );
}
