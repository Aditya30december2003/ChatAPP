import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import tick from '../assets/tick.png';

const ChatScreen = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const topObserverRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getData = async (page: number) => {
    try {
      setLoading(true);
      setIsLoadingMore(page !== 0);
      setError(null);
      const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
      const data = await response.json();
      if (data.chats.length === 0) {
        setHasMore(false);
      } else {
        setChats((prevChats) => {
          const newChats = page === 0 ? data.chats.reverse() : [...data.chats.reverse(), ...prevChats];
          return [...new Set(newChats.map(JSON.stringify))].map(JSON.parse);
        });
        setHasMore(data.chats.length > 0);
      }
    } catch (error) {
      console.error('Failed to fetch chats:', error);
      setError('Failed to load chats. Please try again.');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  useLayoutEffect(() => {
    if (initialLoad && chats.length > 0) {
      bottomRef.current?.scrollIntoView();
      setInitialLoad(false);
    }
  }, [chats, initialLoad]);

  useEffect(() => {
    if (!initialLoad && chats.length > 0 && !isLoadingMore) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, initialLoad, isLoadingMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (topObserverRef.current) {
      observer.observe(topObserverRef.current);
    }

    return () => {
      if (topObserverRef.current) {
        observer.unobserve(topObserverRef.current);
      }
    };
  }, [hasMore, loading]);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div ref={chatContainerRef} className='flex flex-col gap-5 p-2 w-full mb-[5rem] pt-[12rem] overflow-y-auto'>
      <div ref={topObserverRef} style={{ height: '1px' }} />
      {loading && page === 0 && (
        <div className='flex justify-center items-center h-12'>
          <div className='spinner'></div>
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {chats.map((item, index) => {
        const showDate = index === 0 || formatDate(chats[index - 1].time) !== formatDate(item.time);

        return (
          <React.Fragment key={item.id}>
            {showDate && (
              <div className='text-center text-gray-500 mb-2 flex items-center gap-2'>
                <hr className='h-[0.1rem] bg-gray-500 w-[40%]' />
                <div className='text-[0.8rem] w-[30%]'>{formatDate(item.time)}</div>
                <hr className='h-[0.1rem] bg-gray-500 w-[40%]' />
              </div>
            )}
            {item.sender.self ? (
              <div className='flex gap-3 ml-[19%] w-[80%]'>
                <div className='flex flex-col gap-1 items-right w-full p-2 rounded-bl-lg rounded-t-lg text-[0.9rem] bg-blue-600 text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                  <div>{item?.message}</div>
                </div>
              </div>
            ) : (
              <div className='flex gap-3 w-[80%]'>
                <img className='w-[1.8rem] h-[1.8rem] rounded-full' src={item?.sender.image} alt='' />
                <img className='w-[0.8rem] h-[0.8rem] mt-4 ml-5 absolute' src={tick} alt='' />
                <div className='flex flex-col gap-1 items-left w-full p-2 rounded-b-lg rounded-tr-lg text-[0.9rem] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                  <div>{item?.message}</div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
      {loading && page !== 0 && (
        <div className='flex justify-center items-center h-12'>
          <div className='spinner'></div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatScreen;
