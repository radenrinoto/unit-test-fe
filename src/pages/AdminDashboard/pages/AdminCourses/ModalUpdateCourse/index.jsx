import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';

import { getCourses } from '@pages/Courses/actions';
import CustomModal from '@components/Modal';
import Input from '@components/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { updateCourse } from '../actions';
import classes from './style.module.scss';

const ModalUpdateCourse = ({ open, handleClose, payload, categories, instructors }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (data) => {
    dispatch(
      updateCourse(payload?.id, data, () => {
        dispatch(getCourses());
        handleClose();
      })
    );
  };

  return (
    <CustomModal title={`Update ${payload?.title}`} open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.scrollableModal}>
        <div>
          <Input
            type="text"
            name="title"
            label="New Title"
            errors={errors}
            register={register}
            placeholder="New Title"
            defaultValue={payload?.title}
            validationSchema={{
              required: 'title is required',
              minLength: {
                value: 3,
                message: 'Please enter a minimum of 3 characters',
              },
            }}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="description"
            label="New Description"
            errors={errors}
            placeholder="New Description"
            register={register}
            defaultValue={payload?.description}
            validationSchema={{
              required: 'description is required',
              minLength: {
                value: 3,
                message: 'Please enter a minimum of 3 characters',
              },
            }}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="qualified"
            label="New Qualified"
            errors={errors}
            placeholder="New Qualified"
            register={register}
            defaultValue={payload?.qualified}
            validationSchema={{
              required: 'Qualified is required',
              minLength: {
                value: 3,
                message: 'Please enter a minimum of 3 characters',
              },
            }}
            required
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel htmlFor="Category">Category</InputLabel>
            <Controller
              name="category_id"
              control={control}
              defaultValue={payload?.category_id}
              render={({ field }) => (
                <Select {...field} label="Category">
                  {categories.map((category) => (
                    <MenuItem value={category?.id}>{category?.name}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel htmlFor="instructor">Instructor</InputLabel>
            <Controller
              name="instructor_id"
              control={control}
              defaultValue={payload?.instructor_id}
              render={({ field }) => (
                <Select {...field} label="Instructor">
                  {instructors.map((instructor) => (
                    <MenuItem value={instructor?.id}>{instructor?.fullName}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <div>
          <Input
            type="number"
            name="max_participants"
            label="Max Participants"
            errors={errors}
            placeholder="Max Participants"
            register={register}
            defaultValue={payload?.max_participants}
            validationSchema={{
              required: 'Max Participants is required',
              minLength: {
                value: 1,
                message: 'Please enter a minimum of 3 characters',
              },
            }}
            required
          />
        </div>
        <div>
          <Input
            type="number"
            name="price"
            label="Price"
            errors={errors}
            placeholder="Price"
            register={register}
            defaultValue={payload?.price}
            validationSchema={{
              required: 'Price is required',
              minLength: {
                value: 1,
                message: 'Please enter a minimum of 3 characters',
              },
            }}
            required
          />
        </div>
        <div className={classes.date}>
          <span>Start Date</span>
          <Controller
            name="start_date"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
              />
            )}
          />
        </div>
        <div className={classes.date}>
          <span>End Date</span>
          <Controller
            name="end_date"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="End Date"
              />
            )}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </CustomModal>
  );
};

ModalUpdateCourse.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  payload: PropTypes.object,
  categories: PropTypes.array,
  instructors: PropTypes.array,
};

export default ModalUpdateCourse;
