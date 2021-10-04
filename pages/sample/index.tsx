import { GetServerSidePropsContext, InferGetServerSidePropsType, } from "next";
import React, { useEffect, useState } from "react";
import request from "./../utils/axios";
// CSSはCSSmoduleとして読み込むので、↓の命名規則で名前をつけ、↓のimport文で読み込む。
import styles from './sample.module.css';
import Link from 'next/link'

// const receivedFromApiValue = useState(String);

type Task = {
    id: number,
    userName: string
}

function Sample({ data }: InferGetServerSidePropsType<typeof getServerSideProps>){

    const [taskList, setTaskList] = useState<Task[]>();
    //初回レンダリング時のみ実行させたい処理がある場合はuseEffectの第二引数に空の配列を渡すことで実現できる。
    //今回は外部APIから受け取ったデータをJSXに反映させる用途で使用している。
    //これで実質のSSRを体現することができる。
    useEffect(()=>{
        setTaskList(data.contents);
        console.log('SSR is success!');
    },[]);

    return (<div>
        <h2>Sample Page</h2>
        <p>samplepage_samplepage_samplepage_samplepage_samplepage</p>
        <p>{data.title}</p>
        <Link href="/">
            <a>Home</a>
        </Link>
        <div className={styles.vanity_space}>test</div>
        {taskList?.map((task)=>(
            <p key={task.id}>{task.id}:{task.userName}</p>
        ))}
    </div>)
}

export default Sample;

/* この部分がSSRの箇所。ユーザーがurlを叩いたらこのメソッドが呼ばれ、外部APIに連携し、受け取ったデータをページに反映させ、
 完成されたHTMLの状態でユーザーに返す。*/
export async function getServerSideProps(context: GetServerSidePropsContext) {
    let result: any;
    await request.get('http://localhost:5000/api/tasks/').then((res: any)=>{
        result = res.data;
        console.log(result);
        console.log('test message');
    })
     return { props: { data: { title: 'Sample_Title', contents: result }  } }
    // return { props: { data: { title: 'Sample_Title', contents: 'dummy' }  } }
}
