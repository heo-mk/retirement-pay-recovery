import { Routes, Route } from 'react-router-dom';
import TimelinePage from './features/timeline/TimelinePage';
import DiagnosisWizard from './features/diagnosis/DiagnosisWizard';
import CriminalTrackPage from './features/criminalTrack/CriminalTrackPage';
import NavBar from './shared/NavBar';

export default function App() {
  return (
    <>
      <NavBar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<TimelinePage />} />
          <Route path="/diagnosis" element={<DiagnosisWizard />} />
          <Route path="/criminal-track" element={<CriminalTrackPage />} />
        </Routes>
      </div>
    </>
  );
}
