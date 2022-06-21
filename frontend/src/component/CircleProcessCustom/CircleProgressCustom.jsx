
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

let inc = 0;
const CircleProgressCustom = (props) => {
  const { total } = props;
  // const [inc, setInc] = useState(0)
  const [progress, setProgress] = useState(0);
  const increase = () => {
    if (inc > total || (inc / total * 100) >= 100) {
      inc += 0;
      setProgress(100);
      return;
    } else {
      inc += 0.1 * total;
      setProgress(() => Math.round(inc / total * 100));
    }
  }
  // console.log(inc, progress)
  useEffect(() => {
    let timer;
    if (total) {
      timer = setInterval(() => {
        increase();
      }, 20);
    }
    return () => {
      clearInterval(timer);
    };
  }, [total]);
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" sx={{ color: "#50C878" }} size={150} thickness={3} value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="static" component="div" color="#50C878">
          {inc > total ? `${Math.floor(inc)}` : `${Math.ceil(inc)}`}
        </Typography>
      </Box>
    </Box>
  );
}

// CircleProgressCustom.propTypes = {
//   /**
//    * The value of the progress indicator for the determinate variant.
//    * Value between 0 and 100.
//    * @default 0
//    */
//   value: PropTypes.number.isRequired,
// };
export default CircleProgressCustom;
