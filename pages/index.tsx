import fs from "fs";
import path from "path";
import Head from "next/head";
import Parser from "csv-parser";

export default function Home(props: any) {
  const { data, errors, meta } = props;

  return (
    <div style={{ fontFamily: "'Poppins', 'sans-serif'" }}>
      <Head>
        <title>GCCP 2022</title>
      </Head>
      <div className="bg-gray-100 w-full pb-6 whitespace-nowrap overflow-x-hidden">
        <div className="py-10 my-4">
          <h1
            className="font-bold text-4xl text-center"
            style={{ fontFamily: "'Poppins', 'sans-serif'" }}
          >
            GCCP 2022 Status
          </h1>
        </div>
        <div className="overflow-x-auto flex items-center justify-center">
          <table className="rounded-md border-b-4 mb-12 border-b-gray-600 mx-10 dark:border-gray-700 mt-4 text-sm text-left inline-block text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center bg-[#97e0d2] text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 text-lg rounded-tl-md">
                  Sl. No.
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  Name
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  Email
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  # Courses Done
                </th>
                <th scope="col" className="py-3 px-6 text-lg rounded-tr-md">
                  Completed ?
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="bg-white dark:bg-gray-800 dark:border-gray-700 even:bg-slate-200 text-center"
                >
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 dark:text-white"
                  >
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 hover:text-blue-500">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item["Google Cloud Skills Boost Profile URL"]}
                    >
                      {item["Student Name"]}
                    </a>
                  </td>
                  <td className="py-4 px-6">{item["Student Email"]}</td>
                  <td className="py-4 px-6">
                    {item["# of Courses Completed"]}
                  </td>
                  <td className="py-4 px-6">
                    {item["Learning Path Completion Status"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center">
          Designed and developed with ❤️ at GDSC-JMI
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const getData = async (location: string) => {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(location)
        .pipe(Parser())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          console.log("CSV file successfully processed");
          resolve(results);
        })
        .on("error", (error) => {
          console.log("Error while processing CSV file");
          console.log(error);
          reject(error);
        });
    });
  };

  const fileName =
    process.env.NODE_ENV === "development" ? "sample.csv" : "last-updated.csv";

  const fileLocation = path.join(process.cwd(), `data/${fileName}`);
  const res = await getData(fileLocation);
  const data = (res as any).sort((a: any, b: any) => {
    const criteria = "# of Courses Completed";
    return a[criteria] < b[criteria] ? 1 : -1;
  });

  return {
    props: {
      data: data,
    },
  };
}
