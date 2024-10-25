const URL_API =`http://localhost:3000`;
type TLoaiQZ = { id:number, ten_loai:string;slug?:string; thu_tu:number; }
interface IQuiz {
    id:number;  name:string; slug?:string; sku?:string; image:string; decs:string; quiznum:string; times:number;ngay?:string
}
interface ITaiLieu {
  id:number; ten_tl:string; slug:string;sku?:string; hinh_tl:string; ngay?:string; 
}
const lay_loai = async () => {
 let loai_arr:TLoaiQZ[];
 loai_arr =  await fetch(URL_API + `/loai`).then( res => res.json()).then ( d => d);
 let str:string=`<li><a href="home.html">Trang chủ</a></li>`; 
 loai_arr.forEach( loai =>{
    str+=`<li><a href="qztrongloai.html?id=${loai.id}"> ${loai.ten_loai} </a></li>`;
 })
 return `<ul>${str}</ul>`;
}
const lay_ten_loai = async (id) => {
    let loai:TLoaiQZ;
    try {
       loai =  await fetch(URL_API + `/loai/${id}`).then( res => res.json()).then ( d => d);
    }     
    catch(err){
        return `Không có .  (Không có loại ${id})`;
    };
    return `${loai.ten_loai}`;
   }
const code_mot_qz = (qz:IQuiz):string => {
return`
<div class="container mt-3 qz">
<div class="container mt-3">
  <div class="row" style="border: 1px solid black;border-radius: 10px;padding: 20px;">

    <div class="col-sm-4 mt-4">
      <!-- anh -->
      <img src="${qz.image}" alt="" style="width: 100%;position: relative;">
    </div>

    <div class="col-sm-8">
      <!-- tieude -->
      <a href="#" style="text-decoration: none;color: black;"><h5>${qz.name}</h5></a>
      <!-- mota -->
      <p>${qz.decs}</p>
         <hr class="w-auto">
         <div class="foot p-1">
            <div class="row">
              <div class="col-sm-5 mt-2">
                <!-- so cau quiz -->
                <span class="fs-9"><i class="bi bi-calendar me-1"></i>${qz.quiznum}</span>
                <!-- luot thi -->
                <span class="fs-9 ms-2"><i class="bi bi-person-fill"></i> <span>${Number(qz.times).toLocaleString("vi")} lượt thi</span> </span>
              </div>
              <div class="col-sm-3" align="right">
                <a href="#" class="btn btn-primary">xem chi tiết</a>
              </div>
            </div>
      </div>
    </div>

  </div>
</div>
</div>`;
} 


const lay_qz_moi = async (so_qz=12) => {
    let qz_arr:IQuiz[];
    let url = URL_API + `/quiz?_sort=-ngay&_limit=${so_qz}`;
    qz_arr = await fetch(url).then( res => res.json()).then ( d => d);
    let str=``;
    qz_arr.forEach( qz => str+= code_mot_qz(qz));
    return str;
}
const code_mot_qz_hot = (qz:IQuiz):string => {
  return`
          <div>
            <a href="#" style="text-decoration: none;">
            <h6 class="text-dark">${qz.name}</h6>
              <div class="row text-secondary">
                <div class="col-sm-3 fs-8">${qz.quiznum}</div>
                  <div class="col-sm-9 fs-8">${Number(qz.times).toLocaleString("vi")} lượt thi</div>
                </div>
            </a>
                  <hr>
          </div>`;

}
const lay_qz_hot = async () => {
  let qz_arr: IQuiz[];
  let url = URL_API + `/quiz`;  // Lấy tất cả quiz mà không có điều kiện gì

  // Fetch data from the API
  qz_arr = await fetch(url).then(res => res.json()).then(d => d);
  
  // Sắp xếp các quiz theo 'times' theo thứ tự giảm dần
  qz_arr.sort((a, b) => b.times - a.times);

  // Lấy 10 quiz có 'times' lớn nhất
  let top_10_qz = qz_arr.slice(0, 10);

  // Tạo HTML cho top 10 quiz
  let str = ``;
  top_10_qz.forEach(qz => {
      str += code_mot_qz_hot(qz);  // Dùng forEach để tạo HTML cho từng quiz
  });

  return str;
}

const lay_qz_trong_loai = async (id) => {
    let qz_arr:IQuiz[];
    let url = URL_API + `/quiz?id_loai=${id}`;
    qz_arr = await fetch(url).then( res => res.json()).then ( d => d);
    let str=``;
    qz_arr.forEach( qz => str+= code_mot_qz(qz));
    return str;
}

const code_mot_tl = (tl:ITaiLieu):string => {
return`
      <div class="col-sm-2 p-2  text-dark">
        <div class="card" style="border: none;">
          <a href="#" style="text-decoration: wavy;">
            <img class="card-img-top" src="${tl.hinh_tl}" alt="Card image" style="width:100%;height: 150px;">
        <div class="card-body">
            <p class="card-text text-dark" style="text-decoration: none;font-size: small;">${tl.ten_tl}</p>
        </div>
            </a>
        </div>
      </div> `;

}

const lay_tl_moi = async (so_tl=12) => {
  let tl_arr:ITaiLieu[];
  let url = URL_API + `/tailieu?_sort=-ngay&_limit=${so_tl}`;
  tl_arr = await fetch(url).then( res => res.json()).then ( d => d);
  let str=``;
  tl_arr.forEach( tl => str+= code_mot_tl(tl));
  return str;
}


type THinh_Anh = {
    id:number;
    alt:string;
    photographer:string;

}




export {lay_loai, lay_qz_moi, lay_qz_hot};
export {lay_qz_trong_loai, lay_ten_loai};
export {lay_tl_moi};