import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Job {
  id: number;
  title: string;
  category: string;
  salary: string;
}

interface JobFormProps {
  onAddJob: (job: Job) => void;
}

const JobForm: React.FC<JobFormProps> = ({ onAddJob }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (!title || !category || !salary) {
      setError('すべてのフィールドを入力してください。');
      return;
    }

    setIsSubmitting(true);  // 送信ボタンを無効化
  
    try {
      const uniqueToken = uuidv4();
      const response = await axios.post<Job>('https://app-kadai2-b746b950fab6.herokuapp.com/jobs', {
        job: { title, category, salary, unique_token: uniqueToken }
      });
  
      onAddJob(response.data);
  
      setTitle('');
      setCategory('');
      setSalary('');
  
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error adding job:', error);
      setError('求人の投稿に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);  // 送信ボタンを再度有効化
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border rounded w-full max-w-2xl shadow-md mx-auto">
      <h2 className="text-xl text-black font-bold mb-4">求人投稿</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="mb-4">
        <label className="text-black block mb-2">求人タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 bg-white text-black" style={{ width: '600px' }}
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-black block mb-2">カテゴリを選択</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white text-black" style={{ width: '200px' }}
          required
        >
          <option value="">選択してください</option>
          <option value="エンジニア">エンジニア</option>
          <option value="デザイン">デザイン</option>
          <option value="マーケティング">マーケティング</option>
          <option value="営業">営業</option>
          <option value="事務">事務</option>
          <option value="財務・経理">財務・経理</option>
          <option value="人事">人事</option>
          <option value="カスタマーサポート">カスタマーサポート</option>
          <option value="製造">製造</option>
          <option value="医療・介護">医療・介護</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="text-black block mb-2">年収 (万円)</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="border p-2 bg-white text-black" style={{ width: '200px' }}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full" style={{ width: '200px'}} disabled={isSubmitting}>
        投稿
      </button>
    </form>
  );
};

export default JobForm;