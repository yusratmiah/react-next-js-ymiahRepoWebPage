import Link from 'next/link';
import Image from 'next/image';


// function WebsiteEmbed({ src, width, height }) {
//     return (
//       <iframe
//         src={src}
//         width={width}
//         height={height}
//         style={{ border: 'none' }}
//         allowFullScreen
//       />
//     );
//   }

export function CIDLink() {
  return (
    <Link href="https://housing.vt.edu/experience/YourResidenceHall/HallListing/CID.html" className="text-blue-500">The Creativity and Innovation District Residence Hall
    </Link>
  );
}

export default function Page() {
  return (
    <main>
      <div>
        <h1 className= "fontCIDTitle">CID Website Details</h1>
        <Image src="/CID-Day.jpg" alt="Image of Creativity and Innovation District Logo" width={500} height={300} style={{ display: 'block', margin: '0 auto' }} />
        <br/>
        <p className="fontCIDParagraph border-2 border-gray-300 p-4 bg-gray-100">
          The Creativity and Innovation District (CID) Residence Hall at Virginia Tech offers a blend of traditional and suite-style living options. 
          Located on the eastern edge of campus, CID supports 596 residents with amenities like air conditioning, art studios, makerspaces, and classrooms. 
          It is home to Living-Learning Programs like Studio 72, Innovate, and Rhizome, which foster creativity and innovation. 
          The hall features gender-inclusive pod-style restrooms, study lounges, and wireless internet. 
          CID is ideal for students seeking a vibrant community with modern facilities. For more, visit the Virginia Tech Housing Website: <CIDLink />.
        </p>
      </div>
    </main>
  );
}
