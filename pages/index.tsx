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
        <div className="overflow-x-auto lg:flex items-center justify-center">
          <table className="rounded-md border-b-4 mb-12 border-b-gray-600 mx-10 mt-4 text-sm text-left inline-block text-gray-500">
            <thead className="text-xs text-center bg-[#97e0d2] text-gray-700">
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
                <th scope="col" className="py-3 px-6 text-lg">
                  # Badges Done
                </th>
                <th scope="col" className="py-3 px-6 text-lg rounded-tr-md">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={`${
                    item["Enrolment Status"] !== "All Good"
                      ? "bg-red-500 text-gray-100"
                      : "even:bg-slate-200"
                  } text-center`}
                >
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900"
                  >
                    {index + 1}
                  </td>
                  <td
                    className={`py-4 px-6 hover:text-blue-500 ${
                      item["Enrolment Status"] === "All Good"
                        ? "hover:text-blue-500"
                        : "hover:text-gray-800"
                    }`}
                  >
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
                    {item["# of Skill Badges Completed"]}
                  </td>
                  <td
                    // className="py-4 px-2"
                    className="group font-medium relative text-sm px-5 py-2.5 text-center cursor-pointer"
                  >
                    {item["Enrolment Status"] === "All Good" ? "Good" : "Error"}
                    <div
                      className={`absolute hidden group-hover:flex flex-wrap whitespace-normal w-[200px] text-gray-700 -left-40 z-10 p-4 rounded-md ${
                        item["Enrolment Status"] === "All Good"
                          ? "bg-green-200"
                          : "bg-red-200"
                      }`}
                    >
                      {item["Enrolment Status"]}
                    </div>
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
  // console.log(res);
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
