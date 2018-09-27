module Api
  module V1
    class CoffeeShopsController < ApplicationController

      def show
        render :json => CoffeeShop.find(params[:id])
      end
      
      def create
        @cs = CoffeeShop.new(coffee_shop_params)
        if @cs.save
          session[:id] = @cs.id
          render :json => @cs
        else
          render :json => @cs.errors.full_messages
        end
      end

      private
      def coffee_shop_params
        params.require(:coffee_shop).permit(:name, :address, :email, :password)
      end

    end
  end
end
