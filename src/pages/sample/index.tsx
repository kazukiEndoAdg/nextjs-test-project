import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import request from "../../utils/axios";
import Link from "next/link";
// ◎CSSはCSSmoduleとして読み込むので、↓の命名規則で名前をつけ、↓のimport文で読み込む。
import styles from "./sample.module.css";

// type Task = {
//   id: number;
//   userName: string;
// };

function Sample({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const [taskList, setTaskList] = useState<Task[]>();
  const [laravelValue, setLaravelValue] = useState<String[]>();

  //初回レンダリング時のみ実行させたい処理がある場合はuseEffectの第二引数に空の配列を渡すことで実現できる。
  //今回は外部APIから受け取ったデータを画面に反映させる用途で使用している。
  //これでSSRをすることができる。
  useEffect(() => {
    setLaravelValue(data.contents);
    console.log("SSR is success!");
  }, []);

  return (
    <div className={styles.container}>
      <h2>Sample Page</h2>
      <p>samplepage_samplepage_samplepage_samplepage_samplepage</p>
      <Link href="/">
        <a className={styles.transition_link}>Go to Home</a>
      </Link>
      <p>{data.title}</p>
      {laravelValue?.map((value, index) => (
        <p key={index}>{value}</p>
      ))}
    </div>
  );
}

export default Sample;

/* この部分がSSRの箇所。ユーザーがurlを叩いたらこのメソッドが呼ばれ、外部APIに連携し、受け取ったデータをページに反映させ、
 完成されたHTMLの状態でユーザーに返す。*/
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // let result: any;
  // await request.get("http://localhost:5000/api/tasks/").then((res: any) => {
  //   result = res.data;
  // });
  return {
    props: {
      data: {
        title: "↓以下は(本来であれば)Laravelから取得した動的な値となります",
        contents: [
          "return_value1",
          "return_value2",
          "return_value3",
          "return_value4",
          "return_value5",
        ],
      },
    },
  };
}
