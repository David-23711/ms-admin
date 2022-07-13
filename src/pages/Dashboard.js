import React, { useEffect, useState } from 'react';
import { Box, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import FeedbackIcon from '@material-ui/icons/Feedback';
import axios from 'axios';
import PagesIcon from '@material-ui/icons/Pages';
import ViewListIcon from '@material-ui/icons/ViewList';
import { useNavigate, useParams } from 'react-router-dom';
import AddPagination from './AddPagination';
import moment from 'moment';

const Dashboard = () => {
  const baseUrl="http://127.0.0.1:8000/api";
  const [feedback,setFeedback]=useState('');
  const [genreData,setGenreData]=useState('');
  const [mangaData,setMangaData]=useState([]);
  const count = mangaData?.last_page;
  const { page: id } = useParams();
  const [page, setPage] = useState(id ? id : 1);
  const getManga=async()=>{
    await axios.get(`${baseUrl}/admin/fetchingManga?page=${page}`)
    .then((resp)=>{
      setMangaData(resp.data);
    })
  }
  const changePage = () => {
    navigate(`/admin/dashboard/paginate/${page}`);
    getManga();
  };
  const getGenre=async ()=>{
    await axios.get(`${baseUrl}/admin/fetchingGenre`).then((resp)=>{
      setGenreData(resp.data);
    })
  }
  const getFeedback=async()=>{
    await axios.get(`${baseUrl}/user/gettingfeedback`)
    .then((resp)=>{
       setFeedback(resp.data.length);
    })
}
  const navigate=useNavigate();
  const getGenreById = (id) => {
    return genreData?.data?.find((item) => item.id == id)?.name;
  };
  useEffect(()=>{
    getFeedback();
    getGenre();
    changePage()
  },[page])
  return (
    <div>
       <div className="row px-5 pt-5" >

<div className="col-md-4 pb-5">
    <div className="card mx-2">
        <div className="card-body">
            <div className="row pb-3  mx-auto">
                <div className="col-2"></div>
                <div className="col-2">
                <Avatar style={{ backgroundColor: `purple` }} sizes="lg" >{<PagesIcon style={{fontSize:30}} />}</Avatar>
                </div>
                <div className="col-6">
                    <h4 className='text-2xl ' style={{marginBottom: '0.1rem'}}>Total Manga</h4>
                </div>
                <div className="col-2"></div>
            </div>
              <div className=" text-center" >
              <Button color='primary' variant='outlined' style={{width:100}} size="large" onClick={()=>navigate('/admin/manga/paginate/1')}>
              <span className='text-2xl font-bold' >{mangaData?.total || 0}</span>
              </Button>
              </div>
        </div>
    </div>
</div>

<div className="col-md-4 pb-5">
    <div className="card mx-2">
        <div className="card-body">
            <div className="row pb-3  mx-auto">
                <div className="col-2"></div>
                <div className="col-2">
                <Avatar style={{ backgroundColor: `purple` }} sizes="lg" >{<ViewListIcon style={{fontSize:30}} />}</Avatar>
                </div>
                <div className="col-6">
                    <h4 className='text-2xl ' style={{marginBottom: '0.1rem'}}>Total Genre</h4>
                </div>
                <div className="col-2"></div>
            </div>
              <div className=" text-center" >
              <Button color='primary' variant='outlined' style={{width:100}} size="large" onClick={()=>navigate('/admin/genre/paginate/1')} >
              <span className='text-2xl font-bold' >{genreData?.total || 0}</span>
              </Button>
              </div>
        </div>
    </div>
</div>


<div className="col-md-4 pb-5">
    <div className="card mx-2">
        <div className="card-body">
            <div className="row pb-3  mx-auto">
                <div className="col-2"></div>
                <div className="col-2">
                <Avatar style={{ backgroundColor: `purple` }} sizes="lg" >{<FeedbackIcon style={{fontSize:30}} />}</Avatar>
                </div>
                <div className="col-6">
                    <h4 className='text-2xl ' style={{marginBottom: '0.1rem'}}>Total Feedback</h4>
                </div>
                <div className="col-2"></div>
            </div>
              <div className=" text-center" >
              <Button color='primary' variant='outlined' style={{width:100}} size="large" onClick={()=>navigate('/admin/userfeedback')} >
              <span className='text-2xl font-bold' >{feedback || 0}</span>
              </Button>
              </div>
        </div>
    </div>
</div>

<div className="pb-5">
    <div className="card mx-2">
        <div className="card-body">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        
                        <th scope="col">Name</th>
                        <th scope="col">Author Name</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Release Date</th>
                        <th scope='col'>Upload Date</th>
                    </tr>
                </thead>
                <tbody style={{borderTop:' 0px'}}>
                    {
                      mangaData?.data?.map((item)=>(
                        <tr key={item.id} >
                          <td>{item.id}</td>
                         
                          <td>{item.name}</td>
                          <td>{item.author_name}</td>
                          <td>{getGenreById(item.genre_id)}</td>
                          <td>{item.release_date}</td>
                          <td>{moment(item.created_at).fromNow()}</td>
                        </tr>
                      ))
                    }
                </tbody>
            </table>
            <Box
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "7px",
            padding: "20px 0",
          }}
        >
          <AddPagination count={count} page={page} setPage={setPage} />
        </Box>
        </div>
    </div>
</div>


</div>
    </div>
  );
};

export default Dashboard;
