import {Field, Formik, Form } from "formik";
import useCreateComment from "../hooks/useCreateComment";
import { useParams } from "react-router-dom";

function ArticleCommentForm() {
    
    const {slug} = useParams();
    const {isCreatingComment, createComment} = useCreateComment();


   async function onSubmit({body}, {resetForm})
   {

    createComment({values:{

        comment:{
            body
        }

    }, slug

});
        resetForm();
   }
   
    return (
      
        <Formik
        onSubmit={onSubmit}
        initialValues={
            {body:''}
        }
    >
        {(isSubmitting) => (

            <>
                {/* <FormErrors/> */}

                <Form className='card comment-form'>
                    <div className="card-block">
                        <Field
                                type='textarea'
                                required
                                name='body'
                                placeholder='Write a comment...'
                                className='form-control form-control-lg'
                            />
                   
                    </div>

                    <div className="card-footer">
                        <button  type="submit" className="btn btn-sm btn-primary pull-xs-right">
                            Post Comment
                    </button>
                    </div>
               


                   

                    
                </Form>
            </>

        )}
    </Formik>
    );
}

export default ArticleCommentForm;