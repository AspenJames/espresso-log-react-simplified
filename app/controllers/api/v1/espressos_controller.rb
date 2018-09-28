module Api 
  module V1
    class EspressosController < ApplicationController
      def index
        render :json => Origin.find(params[:origin_id]).espressos
      end
    end
  end
end
