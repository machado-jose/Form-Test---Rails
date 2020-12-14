class FormController < ApplicationController
  def index
  end

  def validate
    respond_to do |format|
      format.json { render json: {success?: true} }
    end
  end

  def success 
  end

  def send_user_data
    redirect_to success_path
  end

end
