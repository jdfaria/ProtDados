import React from 'react';
import Section from './Section';
import { SocialMediaActivity } from './InteractiveActivities';

interface ActivityProps {
  onActivityComplete?: (score: number, total: number) => void;
}

const ActivitySocialMedia: React.FC<ActivityProps> = ({ onActivityComplete }) => {
  return (
    <Section title="Atividade: Partilhar ou Ignorar?">
      <SocialMediaActivity onComplete={onActivityComplete} />
    </Section>
  );
};

export default ActivitySocialMedia;
