import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import JobFilter from './components/JobFilter';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

interface Job {
  id: number;
  title: string;
  category: string;
  salary: string;
}

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState<string>("100");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('https://app-kadai2-b746b950fab6.herokuapp.com/jobs');
        setJobs(response.data);
        const uniqueCategories = Array.from(new Set(response.data.map((job: Job) => job.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('ジョブの取得中にエラー発生:', error);
      }
    };

    fetchJobs();
  }, []);

  const addJob = (newJob: Job) => {
    console.log("ジョブ追加:", newJob); //デバック用
    setJobs([newJob, ...jobs]);

    if (!categories.includes(newJob.category)) {
      setCategories([...categories, newJob.category]);
    }
  };

  const filteredJobs = jobs.filter(job => 
    parseInt(job.salary) >= parseInt(minSalary) &&
    (selectedCategories.length === 0 || selectedCategories.includes(job.category))
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-900 text-white p-4 text-xl flex justify-between items-center">
          <div className="font-bold text-3xl">求人検索アプリ</div>
          <nav className="space-x-4">
            <Link to="/" className="text-white">求人検索</Link>
            <Link to="/post" className="text-white">求人投稿</Link>
          </nav>
        </header>
        <div className="flex flex-1 justify-center">
          <aside className="p-4 bg-gray-200" style={{ width: '200px' }}>
            <JobFilter
              categories={categories}
              onCategoryChange={setSelectedCategories}
              onSalaryChange={setMinSalary}
            />
          </aside>
          <main className="p-4 bg-white" style={{ width: '800px' }}>
            <Routes>
              <Route path="/" element={<JobListWrapper jobs={filteredJobs} />} />
              <Route path="/post" element={<JobFormWrapper addJob={addJob} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

// JobListコンポーネント用
const JobListWrapper = ({ jobs }: { jobs: Job[] }) => {
  return <JobList jobs={jobs} />;
};

// JobFormコンポーネント用
const JobFormWrapper = ({ addJob }: { addJob: (job: Job) => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  //二重投稿されない用の関数
  const handleAddJob = async (newJob: Job) => {
    if (isSubmitting) return; // 既に投稿中であれば何もしない

    setIsSubmitting(true); // 投稿中フラグを立てる
    try {
      const response = await axios.post<Job>('https://app-kadai2-b746b950fab6.herokuapp.com/jobs', { job: newJob });
      addJob(response.data);
    } catch (error) {
      console.error('Error adding job:', error);
    } finally {
      setIsSubmitting(false); // 投稿完了後にフラグを解除
    }
  };

  return <JobForm onAddJob={handleAddJob} />;
};

export default App;