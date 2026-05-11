
import React from 'react';
import Section from './Section';
import { PasswordPitfallMatcher } from './InteractiveActivities';

interface ActivityProps {
  onActivityComplete?: (score: number, total: number) => void;
}

const ActivityPasswordMatcher: React.FC<ActivityProps> = ({ onActivityComplete }) => {
  return (
    <Section title="Atividade: Combina as Armadilhas">
      <PasswordPitfallMatcher onComplete={onActivityComplete} />
    </Section>
  );
};

export default ActivityPasswordMatcher;