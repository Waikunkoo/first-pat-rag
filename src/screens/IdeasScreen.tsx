import React, { useState } from 'react';
import { COMMUNITY_IDEAS } from '../data/mockData';

interface IdeasScreenProps {
  onSelectSymbol: (symbol: string) => void;
}

export const IdeasScreen: React.FC<IdeasScreenProps> = ({ onSelectSymbol }) => {
  const [ideas, setIdeas] = useState(COMMUNITY_IDEAS);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const isLiked = !!prev[id];
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.id === id ? { ...idea, likes: idea.likes + (isLiked ? -1 : 1) } : idea
        )
      );
      return { ...prev, [id]: !isLiked };
    });
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 max-w-4xl mx-auto px-margin pt-3">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md font-semibold text-on-surface text-base">Community Ideas</h2>
          <p className="text-xs text-on-surface-variant">Top technical setups & algorithmic market models</p>
        </div>
        <button
          onClick={() => alert('New Trade Idea editor opened')}
          className="h-8 px-3 rounded-lg bg-primary-container text-on-primary-container font-semibold text-xs flex items-center gap-1 hover:brightness-110 shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">edit_square</span>
          <span>Publish</span>
        </button>
      </div>

      {/* Ideas Feed */}
      <div className="flex flex-col gap-3">
        {ideas.map((idea) => {
          const isLiked = likedIds[idea.id];
          return (
            <div
              key={idea.id}
              className="bg-surface-container rounded-xl p-space-md border border-surface-container-high/50 shadow-md space-y-3"
            >
              {/* Author & Symbol */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    alt={idea.author}
                    src={idea.authorAvatar}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-outline-variant/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-on-surface">{idea.author}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-container-high text-primary">
                        {idea.authorRole}
                      </span>
                    </div>
                    <span className="text-[10px] text-outline font-mono">{idea.timeAgo}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectSymbol(idea.symbol)}
                    className="font-mono text-xs font-bold text-on-surface bg-surface-container-high hover:bg-surface-bright px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {idea.symbol}
                  </button>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      idea.sentiment === 'Bullish'
                        ? 'bg-secondary-container/20 text-secondary'
                        : 'bg-surface-container-highest text-outline'
                    }`}
                  >
                    {idea.sentiment}
                  </span>
                </div>
              </div>

              {/* Title & Analysis */}
              <div>
                <h3 className="text-sm font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer">
                  {idea.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  {idea.analysis}
                </p>
              </div>

              {/* Engagement Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/40 text-outline text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(idea.id)}
                    className={`flex items-center gap-1 transition-colors cursor-pointer ${
                      isLiked ? 'text-secondary font-bold' : 'hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {isLiked ? 'thumb_up' : 'thumb_up_off_alt'}
                    </span>
                    <span className="font-mono text-[11px]">{idea.likes}</span>
                  </button>
                  <button
                    onClick={() => alert(`View ${idea.comments} comments on idea`)}
                    className="flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px]">chat_bubble_outline</span>
                    <span className="font-mono text-[11px]">{idea.comments}</span>
                  </button>
                </div>
                <button
                  onClick={() => alert('Idea link copied')}
                  className="flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">share</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
