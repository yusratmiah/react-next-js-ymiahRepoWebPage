import fs from "fs";
import path from "path";
import Papa from "papaparse";

import styles from "./table.module.css";

import Image from 'next/image';

async function getData() {
    // process.cwd(): Returns the current working directory of your Next.js project (i.e., the root directory where package.json is located)
    // 
    const filePath = path.join(process.cwd(), "public", "spring-classes.csv"); // Adjust the path if needed
    const fileContent = fs.readFileSync(filePath, "utf8");

    return new Promise((resolve) => {
        Papa.parse(fileContent, {
            header: true, // Ensures first row is treated as column headers
            skipEmptyLines: true,
            complete: (result) => resolve(result.data),
        });
    });
}

export default async function Page() {
    const data = await getData();

    return (
        <main>
            <h1 className={styles.tdStyleTitle}>Biography</h1>
            <p className= "fontCIDParagraph border-2 border-gray-300 p-4 bg-gray-100">
            I am a third-year undergraduate student (senior by credits) pursuing a degree in Computer Science at Virginia Tech. I am passionate about developing efficient, data-driven applications and innovative solutions. Outside of academics, I serve as a Residential Advisor for the Innovate Living-Learning Community located in CID, where I foster an inclusive and collaborative environment. I am interested in software development and web development because I am continously expanding my skillset in these areas through pursuing projects and courses. Recently, I have expanded my skill set by learning frameworks and technologies such as Bootstrap, React, Next.js, and Vite. I am always eager to connect with peers and professionals to exchange ideas and explore opportunities for growth.
            </p>

            <h1 className={styles.tdStyleTitle}>Organizations I Am a Part Of Currently</h1>
            <div className={styles.orgContainer}>
                <Image src="/swe-logo.png" width={500} height={300} alt="SWE Logo" />
                <Image src="/vt-cs-logo.png" width={500} height={300} alt="VT CS Logo" />
                <Image src="/innovate-logo.png" width={500} height={300} alt="Innovate Logo" />
            </div>

            <h1 className={styles.tdStyleTitle}>Class Schedule - Spring 2025</h1>
            <table style ={{margin: "0 auto"}}>
                <thead>
                    <tr>
                        <th className={styles.tdStyleBlackBold}>Class Name</th>
                        <th className={styles.tdStyleBlackBold}>Days</th>
                        <th className={styles.tdStyleBlackBold}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((classItem, index) => (
                        <tr key={index}>
                            {/* <td style={{ color: "blue", fontWeight: "bold", padding: "10px", border: "1px solid black" }}>
                            {classItem["Classes"]}
                            </td> */}
                            <td className={styles.tdStyleBlueBold}>
                                {classItem["Classes"]}
                            </td>
                            <td className={styles.tdStyleOrange}> 
                                {classItem["Days"]}
                            </td>
                            
                            <td className={styles.tdStyleOrange}>
                                {classItem["Time"]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            

        </main>
    );
}






//Next.js wrapper around fetch
//server component is the best place to fetch data because fetching data on the server will likely yeild speedier results than fetching it on the client
// async function getData() {
//     const res = await fetch("https://snowtooth-api-rest.fly.dev");
//     return res.json();
// }


// export default async function Page(){
//     const data = await getData();
//     return(
//         <main>
//             <h2>
//                 Yusrat Miah Biography Spring 2025
//             </h2>
//             {/* <div>
//                 {JSON.stringify(data)}
//             </div> */}
//             <table>
//                 <thread>
//                     <tr>
//                         <th>
//                             Lift Name
//                         </th>
//                         <th>
//                             Current Status
//                         </th>
//                     </tr>
//                 </thread>
//                 <tbody>
//                     {data.map((lift) => (
//                         <tr key={lift.id}>
//                             <td>{lift.name}</td>
//                             <td>{lift.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </main>
//     )
// }


