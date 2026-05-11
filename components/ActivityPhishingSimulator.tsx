import React from 'react';
import Section from './Section';
import { PhishingSimulator } from './InteractiveActivities';

interface ActivityProps {
  onActivityComplete?: (score: number, total: number) => void;
}

const ActivityPhishingSimulator: React.FC<ActivityProps> = ({ onActivityComplete }) => {
  return (
    <Section title="Atividade: Simulador de Phishing">
      <PhishingSimulator onComplete={onActivityComplete} />
    </Section>
  );
};

export default ActivityPhishingSimulator;
