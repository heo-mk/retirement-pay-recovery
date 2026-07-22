import { Routes, Route } from 'react-router-dom';
import TimelinePage from './features/timeline/TimelinePage';
import DiagnosisWizard from './features/diagnosis/DiagnosisWizard';
import CriminalTrackPage from './features/criminalTrack/CriminalTrackPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TimelinePage />} />
      <Route path="/diagnosis" element={<DiagnosisWizard />} />
      <Route path="/criminal-track" element={<CriminalTrackPage />} />
    </Routes>
  );
}
