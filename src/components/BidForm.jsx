import React from 'react'
import Button from './Button'

function BidForm(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            description: e.target.description.value,
            budget: e.target.budget.value,
            days: e.target.days.value,
        }
        props.handleSubmit(data);
    }


  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
        <p className='font-heading text-heading text-center'>
            Place your bid
        </p>
        <div className='flex flex-col space-y-3'>
            <p className='font-heading text-text'>Description</p>
            <textarea type='text' name="description" className='border border-border rounded-sm p-3 font-text text-text max-w-full max-h-[100px] min-h-[100px]' />
        </div>
        <div className='flex flex-col space-y-3'>
            <p className='font-heading text-text'>Amount</p>
            <input required min={1} type='number' name="budget" className='border border-border rounded-sm p-3 font-text text-text max-w-full max-h-[300px]' />
        </div>
        <div className='flex flex-col space-y-3'>
            <p className='font-heading text-text'>Days</p>
            <input required min={1} type='number' name="days" className='border border-border rounded-sm p-3 font-text text-text max-w-full max-h-[300px]' />
        </div>
        <div className='flex flex-row items-center justify-between pb-8'>
            <Button onClick={props.handleClose} style={{maxWidth:"30%",flex:1, paddingLeft:20, paddingRight:20, borderRadius:20, borderWidth:1,borderColor:"#3276FA",backgroundColor:"white",color:"#3276FA"}} text='Cancel' />
            <Button loading={props.submitLoading} type={"submit"} style={{maxWidth:"30%",flex:1, paddingLeft:20, paddingRight:20, borderRadius:20,}} text='Submit' />
        </div>

    </form>
  )
}

export default BidForm