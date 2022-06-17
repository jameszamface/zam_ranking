import {useState, useCallback} from 'react';

// visible을 켰다 일정시간 후 자동으로 꺼주는 함수가 추가된 훅입니다.
function useAutoVisible() {
  const [visible, setVisible] = useState(false);

  const turnOnAndOffVisible = useCallback((duration: number) => {
    if (duration <= 0) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, duration);
  }, []);

  return {
    visible,
    turnOnAndOffVisible,
    setVisible: setVisible as (visible: boolean) => void,
  };
}

export default useAutoVisible;
