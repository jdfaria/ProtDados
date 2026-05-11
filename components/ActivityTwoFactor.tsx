import React from 'react';
import Section from './Section';
import { TwoFactorSimulator } from './InteractiveActivities';

interface ActivityProps {
  onActivityComplete?: (score: number, total: number) => void;
}

const ActivityTwoFactor: React.FC<ActivityProps> = ({ onActivityComplete }) => {
  return (
    <Section title="Atividade: Configura o teu 2FA">
      <TwoFactorSimulator onComplete={onActivityComplete} />
    </Section>
  );
};

export default ActivityTwoFactor;
