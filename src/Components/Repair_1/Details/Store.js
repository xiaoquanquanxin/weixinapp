import { observable, action } from 'mobx';
//          定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';
    @observable flag=false
    @observable repairDetaildata={}
   // @observable colorStyle=false

    @observable data11= {
        "id": 1,
        "createTime": "2019-01-01 12:12:12",
        "status": 5,
        "problemDescription": "xxxxx",
        "appointmentTime": "occaecat elit",
        "imgesUrl": "incididunt",
        "workInfo": [
            {
                "workDescription": "标题",
                "workId": "laboris cillum fugiat officia dolor",
                "routeList": [
                    {
                        "workStatus": "1",
                        "handleTime": "nisi fugiat ipsum",
                        "describe": "qui dolor elit",
                        "score": "4",
                        "routeImageUrl": "s,un,t,au,te,nu,lla"
                    },
                    {
                        "workStatus": "2",
                        "handleTime": "voluptate dolore ad pariatur",
                        "describe": "Ut dolor",
                        "score": "consequat proident ad",
                        "routeImageUrl": "fugiat eiusmod est"
                    },
                    {
                        "workStatus": "ex consequat",
                        "handleTime": "officia dolore cillum cupidatat",
                        "describe": "pro",
                        "score": "quis anim esse dolor ",
                        "routeImageUrl": "amet magna esse sint"
                    }
                ]
            },
            {
                "workDescription": "aliqua magna",
                "workId": "esse laborum",
                "routeList": [
                    {
                        "workStatus": "3",
                        "handleTime": "ad mollit qui",
                        "describe": "commodo",
                        "score": "aliqua incididunt qui",
                        "routeImageUrl": "Lorem aliqua amet cillum"
                    },
                    {
                        "workStatus": "4",
                        "handleTime": "qui sunt",
                        "describe": "qui Ut nostrud est",
                        "score": "irure id sit lab",
                        "routeImageUrl": "labore quis anim in aliquip"
                    },
                    {
                        "workStatus": "1",
                        "handleTime": "non ipsum",
                        "describe": "dolor aliqua",
                        "score": "mollit",
                        "routeImageUrl": "non D"
                    },
                    {
                        "workStatus": "2",
                        "handleTime": "Lorem quis",
                        "describe": "commodo dolor est",
                        "score": "in",
                        "routeImageUrl": "dolor Ut nulla occaecat est"
                    },
                    {
                        "workStatus": "4",
                        "handleTime": "nisi aliquip elit cillum",
                        "describe": "ea id consectetur Lorem Duis",
                        "score": "sunt adipisicing nostrud mollit",
                        "routeImageUrl": "tempor in ad"
                    }
                ]
            },
            {
                "workDescription": "dolore",
                "workId": "qui laboris in non",
                "routeList": [
                    {
                        "workStatus": "velit ullamco nostrud",
                        "handleTime": "reprehenderit",
                        "describe": "eiusmod",
                        "score": "tempor dolore amet in",
                        "routeImageUrl": "laboris consectetur nostrud aute"
                    },
                    {
                        "workStatus": "Duis",
                        "handleTime": "deserunt aliquip eu",
                        "describe": "aute sit Ut minim dolor",
                        "score": "do id in",
                        "routeImageUrl": "labore Except"
                    },
                    {
                        "workStatus": "magna cillum dolor ad",
                        "handleTime": "veniam esse nostrud",
                        "describe": "aliqua est",
                        "score": "dolor est culpa eiusmod",
                        "routeImageUrl": "irure do aliquip occaecat adipisicing"
                    }
                ]
            },
            {
                "workDescription": "exercitation",
                "workId": "et incididunt non deserunt sed",
                "routeList": [
                    {
                        "workStatus": "proident velit laboris non",
                        "handleTime": "Duis proident",
                        "describe": "pariatur irure voluptate",
                        "score": "ullamco f",
                        "routeImageUrl": "ea"
                    },
                    {
                        "workStatus": "enim adipisicing et qui",
                        "handleTime": "ex aliqua et",
                        "describe": "exercitation",
                        "score": "dolore consectetur commodo ut",
                        "routeImageUrl": "sit pariatur dolor reprehenderit ullamco"
                    },
                    {
                        "workStatus": "qui nostrud quis",
                        "handleTime": "u",
                        "describe": "eu pariatur fugiat officia",
                        "score": "dolor in aliqua magna",
                        "routeImageUrl": "veniam sunt proident"
                    },
                    {
                        "workStatus": "ullamco sint Excepteur dolore laboris",
                        "handleTime": "anim commodo",
                        "describe": "occaecat anim consectetur",
                        "score": "proident Duis sed",
                        "routeImageUrl": "quis Ut enim"
                    }
                ]
            },
            {
                "workDescription": "magna s",
                "workId": "in cupidatat ut consectetur",
                "routeList": [
                    {
                        "workStatus": "consectetur laborum velit pariatur",
                        "handleTime": "commodo dolor Excepteur aute",
                        "describe": "dolore ut ut esse",
                        "score": "Excepteur et",
                        "routeImageUrl": "incididunt"
                    },
                    {
                        "workStatus": "dolore ullamco sit",
                        "handleTime": "mollit Duis",
                        "describe": "Lorem ut qui labore",
                        "score": "eiusmod",
                        "routeImageUrl": "enim occaecat veniam"
                    },
                    {
                        "workStatus": "occaecat adipisicing",
                        "handleTime": "laboris",
                        "describe": "eu voluptate nulla",
                        "score": "culpa sint",
                        "routeImageUrl": "proident aute qui fugiat"
                    },
                    {
                        "workStatus": "est ut aute",
                        "handleTime": "commodo ipsum labore consequat qui",
                        "describe": "qui sunt est",
                        "score": "esse consectetur culpa in adipisicing",
                        "routeImageUrl": "non magna"
                    }
                ]
            }
        ]
    }
}
export default Store;
