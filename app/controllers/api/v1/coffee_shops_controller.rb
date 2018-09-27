module Api
  module V1
    class CoffeeShopsController < ApplicationController
      def search 
        render :json => CoffeeShop.find(params[:id])
      end
    end
  end
end
