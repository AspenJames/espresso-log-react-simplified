module Api 
  module V1
    class OriginsController < ApplicationController

      def create
        coffee_shop = CoffeeShop.find(params[:coffeeShopId])
        origin = coffee_shop.origins.build(origin_params)
        if origin.save
          render :json => origin
        else
          render :json => {"errors": origin.errors.full_messages}
        end
      end

      private
      def origin_params
        params.require(:origin).permit(:name)
      end
    end
  end
end
