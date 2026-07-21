import { Routes, Route } from 'react-router-dom';
import TimelinePage from './features/timeline/TimelinePage';
import DiagnosisWizard from './features/diagnosis/DiagnosisWizard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TimelinePage />} />
      <Route path="/diagnosis" element={<DiagnosisWizard />} />
    </Routes>
  );
}
