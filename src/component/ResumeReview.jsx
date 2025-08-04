import React from 'react'
import { useLocation } from 'react-router-dom';
const ResumeReview = () => {
    
    const location = useLocation();

    const {finalreview} = location.state || {};

      if (!finalreview || !finalreview.scores) {
    return <p>No review data yet.</p>;
  }
  return (
    <div>
        {Object.entries(finalreview.scores).map(([key, category])=>(<div key={key}>
             <h3>{key} -{category.score}</h3></div>
        ))}
        <div>Total Score: {finalreview.totalScore}</div>
    </div>
    
  )
}

export default ResumeReview